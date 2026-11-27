#!/usr/bin/env python3
"""Validate the published skill inventory, manifest agreement and local links."""
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "plugins/html-didatico"
EXPECTED = {
    "html-didatico": "HTML Didático",
    "cartao": "Cartão",
    "aula": "Aula",
    "decidir": "Decidir",
    "montagem": "Montagem",
    "prova": "Prova",
    "explicar": "Explicar",
}


def scalar_fields(text):
    """Read the plain/JSON string subset used by this package's YAML files."""
    fields = {}
    for line in text.splitlines():
        match = re.fullmatch(r"\s*([a-z_]+): (.+)", line)
        if match:
            key, value = match.groups()
            fields[key] = json.loads(value) if value.startswith('"') else value
    return fields


def anchors(path):
    if path.suffix == ".html":
        return set(re.findall(r'\bid=["\']([^"\']+)', path.read_text()))
    found, counts = set(), {}
    for title in re.findall(r"^#{1,6} (.+)$", path.read_text(), re.M):
        title = re.sub(r"[^\w\- ]", "", title.lower()).replace(" ", "-")
        count = counts.get(title, 0)
        counts[title] = count + 1
        found.add(title + (f"-{count}" if count else ""))
    return found


def packaged(root, pattern):
    # Pastas geradas e ignoradas pelo Git (dependência do check, saída do design system) ficam fora.
    return [p for p in root.rglob(pattern) if not {"node_modules", "saida"} & set(p.parts)]


def validate():
    discovered = sorted(packaged(PLUGIN, "SKILL.md"))
    assert {p.parent.name for p in discovered} == set(EXPECTED), discovered
    assert len(discovered) == len(EXPECTED), discovered
    for skill in discovered:
        assert skill.parent.parent == PLUGIN / "skills", skill
        text = skill.read_text()
        assert text.startswith("---\n"), skill
        fields = scalar_fields(text.split("---", 2)[1])
        assert fields["name"] == skill.parent.name, skill
        assert isinstance(fields["description"], str) and fields["description"].strip(), skill
        metadata = scalar_fields((skill.parent / "agents/openai.yaml").read_text())
        assert metadata["display_name"] == EXPECTED[fields["name"]], metadata
        assert metadata["short_description"].strip(), metadata

    portable = json.loads((PLUGIN / "plugin.json").read_text())
    assert portable["$schema"] == "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"
    assert not {"skills", "interface", "mcpServers", "apps"}.intersection(portable), portable
    version = portable["version"]
    assert re.fullmatch(r"\d+\.\d+\.\d+", version), version
    interface = portable["extensions"]["com.openai"]["interface"]
    assert len(interface["shortDescription"]) <= 30, interface
    assert interface["category"] == "Productivity", interface
    for name in (".codex-plugin", ".claude-plugin", ".cursor-plugin"):
        manifest = PLUGIN / name / "plugin.json"
        data = json.loads(manifest.read_text())
        assert data["name"] == portable["name"] and data["version"] == version, manifest
        assert data["skills"] == "./skills/", manifest
        if "interface" in data:
            assert data["interface"] == interface, manifest
    marketplaces = [ROOT / x / "marketplace.json" for x in
                    (".agents/plugins", ".claude-plugin", ".cursor-plugin")]
    for marketplace in marketplaces:
        entry, = json.loads(marketplace.read_text())["plugins"]
        assert entry["name"] == portable["name"] and entry["version"] == version, marketplace
        source = entry["source"]
        source = source["path"] if isinstance(source, dict) else source
        assert (ROOT / source).resolve() == PLUGIN, marketplace

    # O acervo de candidatas vive na raiz, fora do pacote, e só entra no plugin pela referência que diz como registrar.
    assert (PLUGIN / "references/acervo.md").exists()
    assert (ROOT / "acervo/README.md").exists() and (ROOT / "acervo/candidatos").is_dir()
    assert not [p for p in PLUGIN.rglob("*") if p.name == "acervo"], "acervo/ dentro do pacote"

    links = 0
    for document in packaged(ROOT, "*.md"):
        if ".git" in document.parts:
            continue
        # Inline code and fenced examples are not Markdown links.
        text = re.sub(r"```[\s\S]*?```|`[^`\n]+`", "", document.read_text())
        for target in re.findall(r"\[[^\]]*\]\(([^\s)]+)\)", text):
            url = urlsplit(target)
            if url.scheme or url.netloc:
                continue
            path = (document.parent / unquote(url.path)).resolve() if url.path else document
            assert path.exists(), f"{document.relative_to(ROOT)} -> {target}"
            if document.is_relative_to(PLUGIN):
                assert path.is_relative_to(PLUGIN), f"Link escapes plugin: {document} -> {target}"
            if url.fragment:
                assert unquote(url.fragment) in anchors(path), f"Missing anchor: {document} -> {target}"
            links += 1
    assert (ROOT / "CHANGELOG.md").read_text().find("## " + version + " —") >= 0
    print(json.dumps({"status": "passed", "version": version,
                      "skills": list(EXPECTED), "manifests": 7,
                      "resolved_markdown_links": links}, ensure_ascii=False))


if __name__ == "__main__":
    validate()

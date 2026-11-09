/** @param {{title: string, children: import('react').ReactNode}} props */
export function Panel({ title, children }) {
  return <section><h2>{title}</h2><div>{children}</div></section>;
}

/** @param {{tone?: 'neutral' | 'success', label: string}} props */
export function Status({ tone = 'neutral', label }) {
  return <span data-tone={tone}>{label}</span>;
}

export function Summary() {
  return <Panel title="Verificação"><Status label="Aguardando" /></Panel>;
}

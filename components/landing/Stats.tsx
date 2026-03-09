export default function Stats() {
  const stats = [
    { n: '100×', l: 'More affordable\nthan a lawyer' },
    { n: '30s',  l: 'To decode any\nlegal document' },
    { n: '10+',  l: 'Legal domains\ncovered' },
    { n: '2',    l: 'Jurisdictions:\nUSA + India' },
  ]
  return (
    <section style={{ borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', background: '#fff' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid var(--border2)' : 'none' }}>
            <div className="serif" style={{ fontSize: 42, fontWeight: 600, color: 'var(--navy)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5, whiteSpace: 'pre-line', fontWeight: 300 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

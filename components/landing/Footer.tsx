import { Scale, Lock } from 'lucide-react'

export default function Footer() {
  return (
    <>
      <section style={{ padding: '20px 32px', borderTop: '1px solid var(--border2)', background: 'var(--cream2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Lock size={13} color="var(--muted)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>
            LexAI provides legal information, not legal advice. No attorney-client relationship is created. Results may not reflect the most current legal developments. For serious legal matters, always consult a licensed attorney in your jurisdiction. LexAI is not a law firm and does not provide legal representation.
          </p>
        </div>
      </section>
      <footer style={{ padding: '40px 32px', borderTop: '1px solid var(--border2)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Scale size={18} color="var(--gold)" strokeWidth={1.5} />
            <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>LexAI</span>
            <span style={{ color: 'var(--muted)', fontSize: 13, marginLeft: 8, fontWeight: 300 }}>© 2026</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Disclaimer', 'Contact', 'API'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'var(--muted)', cursor: 'pointer', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--navy)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🇺🇸 USA', '🇮🇳 India'].map(t => (
              <span key={t} style={{
                padding: '3px 10px', borderRadius: 2,
                background: 'var(--navy)', color: 'var(--cream)',
                fontSize: 11, fontWeight: 600, letterSpacing: .5,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

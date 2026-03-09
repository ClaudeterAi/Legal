import { Check } from 'lucide-react'

const juris = [
  {
    flag: '🇺🇸', name: 'United States', sub: 'Federal + All 50 States',
    items: ['Federal statutes & US Code', 'SCOTUS + Circuit Court precedents', 'State-specific contract & property law', 'EEOC, IRS, SEC regulatory guidance'],
  },
  {
    flag: '🇮🇳', name: 'India', sub: 'Central + State Laws',
    items: ['IPC / BNS, CPC / BNSS', 'Supreme Court & High Court judgments', 'GST, Companies Act 2013, RERA', 'Hindi, Bengali, Tamil + 8 regional languages'],
  },
]

export default function Jurisdictions() {
  return (
    <section style={{ padding: '80px 32px', background: 'var(--cream2)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="serif" style={{ fontSize: 36, fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>
            Built for <span style={{ fontStyle: 'italic' }}>two legal universes</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300 }}>
            Full coverage across US federal & state law and Indian statutes — expanding to UAE, UK, Singapore.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {juris.map((j, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 36 }}>{j.flag}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>{j.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>{j.sub}</div>
                </div>
              </div>
              {j.items.map((item, k) => (
                <div key={k} style={{
                  display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0',
                  borderTop: k > 0 ? '1px solid var(--border2)' : 'none',
                }}>
                  <Check size={13} color="var(--green)" strokeWidth={2.5} />
                  <span style={{ fontSize: 13.5, color: 'var(--text)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

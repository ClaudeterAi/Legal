'use client'
import { Check } from 'lucide-react'

interface Props { onAuth: (m: 'signin' | 'signup') => void }

const plans = [
  {
    tier: 'Free', price: '$0', inr: '₹0', sub: '/month',
    note: 'Get started — no card required',
    items: ['2 document decodes / month', '3 Legal Q&A queries', '1 document template', 'English only'],
    cta: 'Start Free', featured: false,
  },
  {
    tier: 'Pro', price: '$19', inr: '₹599', sub: '/month',
    note: 'For individuals who need real legal clarity',
    items: ['30 document decodes / month', '100 Q&A queries', '20 document templates', 'Hindi + 5 languages', 'Case Simulator — 5/month', 'Full history'],
    cta: 'Start Pro Trial', featured: true,
  },
  {
    tier: 'Law Firm', price: '$149', inr: '₹3,999', sub: '/seat/month',
    note: 'Replace junior-associate research time',
    items: ['Unlimited everything', 'Legal Research Engine™', 'Contract redlining', 'Client Intake AI', 'API access', 'Dedicated support'],
    cta: 'Contact Sales', featured: false,
  },
]

export default function Pricing({ onAuth }: Props) {
  return (
    <section style={{ padding: '100px 32px', background: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-flex', padding: '3px 10px', borderRadius: 2, marginBottom: 14,
            background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
            border: '1px solid rgba(184,149,42,.25)', fontSize: 11, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
          }}>Pricing</span>
          <h2 className="serif" style={{ fontSize: 40, fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>
            Simple. Transparent. <span style={{ fontStyle: 'italic' }}>Worth every cent.</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300 }}>Start free. Upgrade when you need more.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid var(--border2)', borderRadius: 4, overflow: 'hidden' }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              padding: 36,
              borderRight: i < 2 ? `1px solid ${p.featured ? 'rgba(255,255,255,.1)' : 'var(--border2)'}` : 'none',
              background: p.featured ? 'var(--navy)' : '#fff',
              position: 'relative',
            }}>
              {p.featured && (
                <div style={{ marginBottom: 14 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 2,
                    background: 'rgba(212,175,80,.15)', color: 'var(--gold2)',
                    border: '1px solid rgba(212,175,80,.3)',
                    fontSize: 10, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
                  }}>★ Most Popular</span>
                </div>
              )}
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: .8, textTransform: 'uppercase' as const, marginBottom: 10, color: p.featured ? 'rgba(250,250,247,.5)' : 'var(--muted)' }}>{p.tier}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span className="serif" style={{ fontSize: 44, fontWeight: 600, lineHeight: 1, color: p.featured ? 'var(--cream)' : 'var(--navy)' }}>{p.price}</span>
                <span style={{ fontSize: 13, color: p.featured ? 'rgba(250,250,247,.4)' : 'var(--muted)' }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gold2)', marginBottom: 8 }}>{p.inr}{p.sub}</div>
              <p style={{ fontSize: 13, color: p.featured ? 'rgba(250,250,247,.5)' : 'var(--muted)', marginBottom: 24, fontWeight: 300, lineHeight: 1.55 }}>{p.note}</p>

              {p.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                  <Check size={13} color={p.featured ? 'var(--gold2)' : 'var(--green)'} style={{ marginTop: 2, flexShrink: 0 }} strokeWidth={2.5} />
                  <span style={{ fontSize: 13, color: p.featured ? 'rgba(250,250,247,.75)' : 'var(--text)', lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}

              <button onClick={() => onAuth('signup')} style={{
                width: '100%', padding: '12px', borderRadius: 3, marginTop: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                ...(p.featured
                  ? { background: 'var(--gold)', color: '#fff', border: 'none' }
                  : { background: 'transparent', color: 'var(--navy)', border: '1.5px solid var(--border)' }),
              }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

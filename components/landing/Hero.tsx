'use client'
import { ArrowRight, Sparkles } from 'lucide-react'

interface Props { onAuth: (m: 'signin' | 'signup') => void }

export default function Hero({ onAuth }: Props) {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 100, paddingLeft: 32, paddingRight: 32 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div className="animate-rise" style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 2,
                background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
                border: '1px solid rgba(184,149,42,.25)',
                fontSize: 11, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
              }}>
                <Sparkles size={10} /> USA + India · Launching 2026
              </span>
            </div>

            <h1 className="serif animate-rise-2" style={{
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              fontWeight: 600, lineHeight: 1.06,
              color: 'var(--navy)', marginBottom: 24, letterSpacing: '-0.5px',
            }}>
              Your lawyer.<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Everywhere.</span><br />
              Always.
            </h1>

            <div style={{ height: 2, width: 64, background: 'var(--gold)', marginBottom: 24 }} className="animate-rise-2" />

            <p className="animate-rise-3" style={{
              fontSize: 17, color: 'var(--muted)', lineHeight: 1.75,
              maxWidth: 500, fontWeight: 300, marginBottom: 36,
            }}>
              AI-powered legal clarity for real people. Decode documents, know your rights,
              draft contracts — in seconds, not hours. For{' '}
              <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>$19/month</strong> instead of{' '}
              <span style={{ textDecoration: 'line-through', opacity: .5 }}>$400/hr</span>.
            </p>

            <div className="animate-rise-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <button onClick={() => onAuth('signup')} style={{
                padding: '13px 28px', borderRadius: 3, background: 'var(--navy)',
                border: 'none', color: 'var(--cream)',
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all .22s',
              }}>
                Start Free — No Card Needed <ArrowRight size={16} />
              </button>
              <button style={{
                padding: '13px 24px', borderRadius: 3, background: 'transparent',
                border: '1.5px solid var(--border)', color: 'var(--navy)',
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500, cursor: 'pointer',
                transition: 'all .22s',
              }}>
                See How It Works
              </button>
            </div>

            {/* Social proof */}
            <div className="animate-rise-4" style={{
              display: 'flex', alignItems: 'center', gap: 16,
              paddingTop: 24, borderTop: '1px solid var(--border2)',
            }}>
              <div style={{ display: 'flex' }}>
                {['#0F1F3D', '#2A4A8A', '#B8952A', '#1A6B4A'].map((c, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: '50%', background: c,
                    border: '2px solid var(--cream)', marginLeft: i ? -8 : 0,
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400 }}>
                Trusted by <strong style={{ color: 'var(--navy)' }}>1,200+</strong> early users
              </span>
            </div>
          </div>

          {/* Right — preview card */}
          <div className="animate-rise-3" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -20,
              background: 'linear-gradient(135deg, rgba(184,149,42,.06), transparent 60%)',
              borderRadius: 8,
            }} />
            <div style={{
              background: '#fff', border: '1px solid var(--border2)',
              borderRadius: 4, padding: 28, position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>Document Decoder™</span>
                <span style={{
                  marginLeft: 'auto', padding: '2px 8px', borderRadius: 2,
                  background: 'var(--navy)', color: 'var(--cream)',
                  fontSize: 10, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
                }}>Live Preview</span>
              </div>

              <div style={{
                background: 'var(--cream2)', borderRadius: 3, padding: 14,
                marginBottom: 16, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300,
              }}>
                <em>&quot;This Rental Agreement is entered into between Landlord and Tenant for the property at 123 Main Street...&quot;</em>
              </div>

              {[
                { label: 'Summary', text: 'Standard 12-month residential lease. Generally balanced terms.', type: 'green' },
                { label: '⚑ Red Flag', text: 'Security deposit exceeds legal limit in California.', type: 'red' },
                { label: 'Obligation', text: '30-day written notice required to terminate.', type: 'gold' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0',
                  borderTop: i > 0 ? '1px solid var(--border2)' : 'none',
                }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 2, whiteSpace: 'nowrap' as const, marginTop: 1,
                    fontSize: 10, fontWeight: 600, letterSpacing: .4, textTransform: 'uppercase' as const,
                    ...(item.type === 'green'
                      ? { background: 'rgba(26,107,74,.08)', color: 'var(--green)', border: '1px solid rgba(26,107,74,.2)' }
                      : item.type === 'red'
                      ? { background: 'rgba(192,57,43,.07)', color: 'var(--red)', border: '1px solid rgba(192,57,43,.2)' }
                      : { background: 'rgba(184,149,42,.1)', color: 'var(--gold)', border: '1px solid rgba(184,149,42,.25)' }),
                  }}>{item.label}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.55 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute', bottom: -16, right: -16,
              background: 'var(--navy)', borderRadius: 3, padding: '10px 16px',
              boxShadow: '0 8px 24px rgba(15,31,61,.2)',
            }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>30s</div>
              <div style={{ fontSize: 11, color: 'rgba(250,250,247,.6)', marginTop: 2 }}>analysis time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

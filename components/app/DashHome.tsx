'use client'
import Link from 'next/link'
import { FileText, MessageSquare, BookOpen, AlertTriangle } from 'lucide-react'

interface Props { profile: Record<string, unknown> | null }

const LEGAL_AREAS = ['Criminal','Civil','Corporate','Family','Tax','Employment','Immigration','Real Estate','IP & Patents','Constitutional']

export default function DashHome({ profile }: Props) {
  const name = (profile?.name as string)?.split(' ')[0] || 'there'
  const decodesUsed = (profile?.decodes_used as number) || 0
  const qaUsed = (profile?.qa_used as number) || 0

  const actions = [
    { icon: FileText,      label: 'Decode a Document',       sub: 'Upload & analyze instantly', href: '/dashboard/decoder', tag: 'Most Used' },
    { icon: MessageSquare, label: 'Ask a Legal Question',    sub: 'Chat with specialist AI',    href: '/dashboard/qa',      tag: null },
    { icon: BookOpen,      label: 'Generate a Document',     sub: '50+ templates coming soon',  href: '/dashboard/documents', tag: 'Soon' },
  ]

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="serif" style={{ fontSize: 34, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
          Good day, {name}.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300 }}>What legal matter can we help you with?</p>
      </div>

      <div style={{ height: 2, width: 48, background: 'var(--gold)', marginBottom: 36 }} />

      {/* Usage */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Decodes Used', value: decodesUsed, limit: 2 },
          { label: 'Q&A Queries', value: qaUsed, limit: 3 },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff', border: '1px solid var(--border2)', borderRadius: 4,
            padding: '16px 20px', minWidth: 160,
          }}>
            <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)' }}>{stat.value}<span style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 400 }}>/{stat.limit}</span></div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 300 }}>{stat.label} this month</div>
          </div>
        ))}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy), var(--navy2))',
          borderRadius: 4, padding: '16px 20px', minWidth: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 12, color: 'rgba(250,250,247,.6)', fontWeight: 300 }}>Current Plan</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gold2)', marginTop: 6 }}>
            {((profile?.plan as string) || 'free').charAt(0).toUpperCase() + ((profile?.plan as string) || 'free').slice(1)}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(250,250,247,.4)', marginTop: 2 }}>Upgrade for more →</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
        {actions.map((a) => {
          const Icon = a.icon
          return (
            <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 24,
                cursor: 'pointer', transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,31,61,.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, border: '1px solid var(--border2)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  {a.tag && (
                    <span style={{
                      padding: '2px 8px', borderRadius: 2,
                      background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
                      border: '1px solid rgba(184,149,42,.25)',
                      fontSize: 10, fontWeight: 600, letterSpacing: .4, textTransform: 'uppercase' as const,
                    }}>{a.tag}</span>
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300 }}>{a.sub}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Legal Areas */}
      <div style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>Legal Areas We Cover</h3>
          <span style={{ padding: '2px 8px', borderRadius: 2, background: 'var(--navy)', color: 'var(--cream)', fontSize: 10, fontWeight: 600, letterSpacing: .5 }}>USA + INDIA</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
          {LEGAL_AREAS.map(area => (
            <Link key={area} href="/dashboard/qa" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                background: 'var(--cream2)', borderRadius: 3, cursor: 'pointer', transition: 'background .18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--cream2)')}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, color: 'var(--text)', fontWeight: 400 }}>{area}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 20, padding: '14px 16px', borderRadius: 3,
        background: 'rgba(192,57,43,.05)', border: '1px solid rgba(192,57,43,.12)',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <AlertTriangle size={14} color="var(--red)" style={{ marginTop: 1, flexShrink: 0 }} />
        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>
          LexAI provides legal <em>information</em>, not legal advice. No attorney-client relationship is formed. For serious matters, consult a licensed attorney.
        </p>
      </div>
    </div>
  )
}

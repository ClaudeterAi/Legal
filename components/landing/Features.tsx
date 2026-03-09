import { FileText, MessageSquare, BookOpen, Shield, Zap, Globe } from 'lucide-react'

const features = [
  { icon: FileText,       title: 'Document Decoder™',     desc: 'Upload any contract, notice, or agreement. Receive a plain-English breakdown — risks, obligations, red flags — in under 30 seconds.' },
  { icon: MessageSquare,  title: 'Legal Q&A™',            desc: 'Ask any legal question. Specialist AI routes to the right domain — criminal, civil, tax, family — with jurisdiction-specific precision.' },
  { icon: BookOpen,       title: 'Document Generator™',   desc: 'Generate NDAs, rental agreements, demand letters, and employment contracts tailored to your jurisdiction in minutes.' },
  { icon: Shield,         title: 'Rights Checker™',       desc: 'Know exactly what you\'re entitled to in the moment you need it. Arrest, eviction, dismissal — know your rights instantly.' },
  { icon: Zap,            title: 'Case Simulator™',       desc: 'Input your situation. Get best-case, worst-case, and likely outcomes with settlement value estimates and strategic recommendations.' },
  { icon: Globe,          title: 'Compliance Monitor™',   desc: 'Stay ahead of regulatory deadlines across GST, SEC filings, RERA timelines, and more with automated reminders.' },
]

export default function Features() {
  return (
    <section style={{ padding: '100px 32px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ marginBottom: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{
              display: 'inline-flex', padding: '3px 10px', borderRadius: 2, marginBottom: 12,
              background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
              border: '1px solid rgba(184,149,42,.25)', fontSize: 11, fontWeight: 600,
              letterSpacing: .5, textTransform: 'uppercase' as const,
            }}>Platform</span>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.1 }}>
              The 365° Legal<br /><span style={{ fontStyle: 'italic' }}>Operating System</span>
            </h2>
          </div>
          <p style={{ maxWidth: 320, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
            Everything a lawyer does — except stand in court. Document analysis, research, drafting, strategy, compliance. One platform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border2)' }}>
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} style={{ padding: 32, background: '#fff', transition: 'background .2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <Icon size={20} color="var(--gold)" strokeWidth={1.5} style={{ marginBottom: 20 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

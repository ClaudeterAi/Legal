import { ChevronRight } from 'lucide-react'

const steps = [
  { n: '01', title: 'Upload or Ask',  desc: 'Drop any document or type your question in plain English. No jargon needed.' },
  { n: '02', title: 'AI Analyzes',    desc: 'Specialist legal AI reads statutes, case law, and precedents with real citations.' },
  { n: '03', title: 'Get Clarity',    desc: 'Actionable breakdown — rights, risks, obligations, next steps.' },
]

export default function HowItWorks() {
  return (
    <section style={{ padding: '80px 32px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex', padding: '3px 10px', borderRadius: 2, marginBottom: 20,
          background: 'rgba(184,149,42,.15)', color: 'var(--gold2)',
          border: '1px solid rgba(184,149,42,.25)', fontSize: 11, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
        }}>How It Works</span>

        <h2 className="serif" style={{ fontSize: 40, fontWeight: 600, color: 'var(--cream)', marginBottom: 12 }}>
          Legal clarity in three steps
        </h2>
        <p style={{ color: 'rgba(250,250,247,.5)', marginBottom: 60, fontSize: 16, fontWeight: 300 }}>
          No jargon. No forms. No waiting.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'center' }}>
          {steps.flatMap((step, i) => [
            <div key={step.n} style={{ padding: 28, textAlign: 'left', border: '1px solid rgba(255,255,255,.07)', borderRadius: 3 }}>
              <div className="serif" style={{ fontSize: 44, fontWeight: 600, color: 'rgba(184,149,42,.25)', lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--cream)', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(250,250,247,.45)', lineHeight: 1.65, fontWeight: 300 }}>{step.desc}</p>
            </div>,
            i < 2 ? <ChevronRight key={`arrow-${i}`} size={20} color="rgba(184,149,42,.4)" style={{ justifySelf: 'center' }} /> : null,
          ]).filter(Boolean)}
        </div>
      </div>
    </section>
  )
}

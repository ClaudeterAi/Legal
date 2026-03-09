'use client'
import { useState, useRef } from 'react'
import { FileText, Upload, Zap, Check, AlertTriangle, Sparkles, RotateCcw } from 'lucide-react'

type Analysis = {
  type: string
  jurisdiction: string
  summary: string
  riskScore: number
  keyPoints: string[]
  redFlags: string[]
  obligations: string[]
  recommendation: string
}

const JURISDICTIONS = ['USA', 'India', 'UK', 'UAE']

export default function DocumentDecoder() {
  const [text, setText] = useState('')
  const [jurisdiction, setJurisdiction] = useState('USA')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Analysis | null>(null)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const analyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/decode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, jurisdiction }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed. Please try again.')
    }
    setLoading(false)
  }

  const riskColor = (s: number) => s >= 4 ? 'var(--red)' : s >= 3 ? '#D97706' : 'var(--green)'
  const riskLabel = (s: number) => s >= 4 ? 'High Risk' : s >= 3 ? 'Medium' : 'Low Risk'

  const inputStyle = {
    padding: '6px 14px', borderRadius: 3, border: '1.5px solid', cursor: 'pointer',
    fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 860 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <FileText size={22} color="var(--gold)" strokeWidth={1.5} />
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)' }}>Document Decoder™</h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300 }}>
          Paste any legal document. Get plain-English analysis with risk flags in seconds.
        </p>
      </div>

      {!result ? (
        <>
          {/* Jurisdiction selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {JURISDICTIONS.map(j => (
              <button key={j} onClick={() => setJurisdiction(j)} style={{
                ...inputStyle,
                background: jurisdiction === j ? 'rgba(184,149,42,.1)' : 'transparent',
                borderColor: jurisdiction === j ? 'var(--gold)' : 'var(--border)',
                color: jurisdiction === j ? 'var(--gold)' : 'var(--muted)',
              }}>{j}</button>
            ))}
          </div>

          {/* Drop zone */}
          <div
            className={`upload-zone ${dragOver ? 'drag-active' : ''}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault(); setDragOver(false)
              const file = e.dataTransfer.files[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = ev => setText(ev.target?.result as string)
                reader.readAsText(file)
              }
            }}
            style={{ padding: '28px', textAlign: 'center', marginBottom: 16 }}
          >
            <Upload size={28} color="rgba(184,149,42,.6)" style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 4 }}>Drop document here or click to upload</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', opacity: .6 }}>TXT files — or paste text below</div>
            <input ref={fileRef} type="file" accept=".txt" style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = ev => setText(ev.target?.result as string)
                  reader.readAsText(file)
                }
              }} />
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={'Paste your legal document here...\n\nExample: "This Rental Agreement is entered into on January 1, 2026 between John Doe (Landlord) and Jane Smith (Tenant) for the property at 123 Main St..."'}
            style={{
              width: '100%', minHeight: 220, padding: '16px', fontSize: 14,
              borderRadius: 3, resize: 'vertical' as const, lineHeight: 1.65,
              border: '1.5px solid var(--border)', fontFamily: 'DM Sans, sans-serif',
              color: 'var(--text)', background: '#fff', outline: 'none',
            }}
          />

          {error && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(192,57,43,.06)', borderRadius: 3, border: '1px solid rgba(192,57,43,.15)', fontSize: 13, color: 'var(--red)' }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={analyze} disabled={loading || !text.trim()} style={{
              padding: '12px 28px', borderRadius: 3, background: 'var(--navy)', border: 'none',
              color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
              cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
              opacity: !text.trim() ? .5 : 1,
              display: 'flex', alignItems: 'center', gap: 8, transition: 'all .22s',
            }}>
              {loading ? (
                <><span style={{ width: 16, height: 16, border: '2px solid rgba(250,250,247,.2)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} /> Analyzing...</>
              ) : (
                <><Zap size={15} strokeWidth={2} /> Decode Document</>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="animate-fade">
          {/* Summary card */}
          <div style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <span style={{
                  display: 'inline-block', padding: '2px 10px', borderRadius: 2, marginBottom: 8,
                  background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
                  border: '1px solid rgba(184,149,42,.25)', fontSize: 11, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
                }}>{result.type}</span>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 300 }}>Jurisdiction: {result.jurisdiction}</div>
              </div>
              <div style={{
                textAlign: 'center', padding: '10px 20px', borderRadius: 3,
                background: `${riskColor(result.riskScore)}0D`,
                border: `1px solid ${riskColor(result.riskScore)}40`,
              }}>
                <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: riskColor(result.riskScore), lineHeight: 1 }}>{result.riskScore}/5</div>
                <div style={{ fontSize: 11, color: riskColor(result.riskScore), fontWeight: 600, marginTop: 2 }}>{riskLabel(result.riskScore)}</div>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.7, fontWeight: 300 }}>{result.summary}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {/* Key Points */}
            <div style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 14, textTransform: 'uppercase' as const, letterSpacing: .8 }}>Key Points</h3>
              {result.keyPoints.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <Check size={13} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} strokeWidth={2.5} />
                  <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55, fontWeight: 300 }}>{p}</span>
                </div>
              ))}
            </div>

            {/* Red Flags */}
            <div style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--red)', marginBottom: 14, textTransform: 'uppercase' as const, letterSpacing: .8 }}>
                ⚑ Red Flags{result.redFlags.length === 0 && <span style={{ color: 'var(--green)', fontSize: 11, marginLeft: 8, textTransform: 'none' }}>None found</span>}
              </h3>
              {result.redFlags.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--green)' }}>✓ No major red flags detected</div>
              ) : result.redFlags.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <AlertTriangle size={13} color="var(--red)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55, fontWeight: 300 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Obligations */}
          <div style={{ background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy2)', marginBottom: 14, textTransform: 'uppercase' as const, letterSpacing: .8 }}>Your Obligations & Key Dates</h3>
            {result.obligations.map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--navy2)', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 300 }}>{o}</span>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(184,149,42,.08), rgba(184,149,42,.03))',
            border: '1px solid rgba(184,149,42,.25)', borderRadius: 4, padding: 20,
            display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 20,
          }}>
            <Sparkles size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: .5 }}>LexAI Recommendation</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, fontWeight: 400 }}>{result.recommendation}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => { setResult(null); setText('') }} style={{
              padding: '11px 24px', borderRadius: 3, background: 'var(--navy)', border: 'none',
              color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <RotateCcw size={14} /> Decode Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

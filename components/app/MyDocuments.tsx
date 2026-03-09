'use client'
import { useState, useEffect } from 'react'
import { FolderOpen } from 'lucide-react'

type Doc = {
  id: string
  title: string
  doc_type: string
  jurisdiction: string
  risk_score: number
  created_at: string
}

const TEMPLATES = [
  { name: 'Rental Agreement', area: 'Real Estate', icon: '🏠', ready: true },
  { name: 'Non-Disclosure Agreement', area: 'Corporate', icon: '🔒', ready: true },
  { name: 'Freelancer Service Contract', area: 'Corporate', icon: '💼', ready: true },
  { name: 'Demand Letter / Legal Notice', area: 'Civil', icon: '📨', ready: true },
  { name: 'Employment Contract', area: 'Employment', icon: '📋', ready: false },
  { name: 'Will & Testament', area: 'Estate', icon: '⚖️', ready: false },
  { name: 'Partnership Deed', area: 'Corporate', icon: '🤝', ready: false },
  { name: 'RTI Application (India)', area: 'Constitutional', icon: '🇮🇳', ready: false },
]

export default function MyDocuments() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'history' | 'templates'>('history')

  useEffect(() => {
    fetch('/api/documents')
      .then(r => r.json())
      .then(d => { setDocs(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const riskColor = (s: number) => s >= 4 ? 'var(--red)' : s >= 3 ? '#D97706' : 'var(--green)'

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <FolderOpen size={22} color="var(--gold)" strokeWidth={1.5} />
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)' }}>My Documents</h1>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300, marginBottom: 28 }}>
        Your decoded documents and generated contracts.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid var(--border2)', marginBottom: 28 }}>
        {[['history', 'Decode History'], ['templates', 'Generate Document']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as 'history' | 'templates')} style={{
            padding: '10px 20px 10px 0', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: tab === id ? '2px solid var(--navy)' : '2px solid transparent',
            marginBottom: '-1.5px', fontSize: 14, fontWeight: 600,
            color: tab === id ? 'var(--navy)' : 'var(--muted)',
            fontFamily: 'DM Sans, sans-serif', transition: 'all .18s',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'history' && (
        loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)', fontSize: 14, fontWeight: 300 }}>Loading...</div>
        ) : docs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
            <p className="serif" style={{ fontSize: 20, color: 'var(--muted)', marginBottom: 8 }}>No documents yet</p>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>Decode your first document to see it here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {docs.map(doc => (
              <div key={doc.id} style={{
                background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16, transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 300 }}>
                    {doc.doc_type} · {doc.jurisdiction} · {new Date(doc.created_at).toLocaleDateString()}
                  </div>
                </div>
                {doc.risk_score && (
                  <div style={{
                    padding: '3px 10px', borderRadius: 2,
                    background: `${riskColor(doc.risk_score)}10`,
                    border: `1px solid ${riskColor(doc.risk_score)}30`,
                    fontSize: 11, fontWeight: 600, color: riskColor(doc.risk_score),
                  }}>Risk {doc.risk_score}/5</div>
                )}
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'templates' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {TEMPLATES.map((t, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--border2)', borderRadius: 4, padding: 20,
              opacity: t.ready ? 1 : .55, cursor: t.ready ? 'pointer' : 'default',
              transition: 'all .25s',
            }}
            onMouseEnter={e => t.ready && (e.currentTarget.style.borderColor = 'var(--border)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border2)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32 }}>{t.icon}</span>
                <span style={{
                  padding: '2px 8px', borderRadius: 2,
                  fontSize: 10, fontWeight: 600, letterSpacing: .4, textTransform: 'uppercase' as const,
                  ...(t.ready
                    ? { background: 'rgba(26,107,74,.08)', color: 'var(--green)', border: '1px solid rgba(26,107,74,.2)' }
                    : { background: 'rgba(184,149,42,.1)', color: 'var(--gold)', border: '1px solid rgba(184,149,42,.25)' }),
                }}>{t.ready ? 'Available' : 'Coming Soon'}</span>
              </div>
              <div style={{ marginTop: 14, fontSize: 14, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 300 }}>{t.area}</div>
              {t.ready && (
                <button style={{
                  marginTop: 14, width: '100%', padding: '9px', borderRadius: 3,
                  background: 'var(--navy)', border: 'none', color: 'var(--cream)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>Generate</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

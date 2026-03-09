'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Scale } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

const LEGAL_AREAS = ['General','Criminal','Civil','Corporate','Family','Tax','Employment','Immigration','Real Estate','IP & Patents','Constitutional']
const QUICK_Q = [
  "What are my rights if I get arrested?",
  "Can my landlord evict me without notice?",
  "Is my non-compete clause enforceable?",
  "How do I send a legal notice in India?",
]

export default function LegalQA() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [jurisdiction, setJurisdiction] = useState('USA')
  const [legalArea, setLegalArea] = useState('General')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: q }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          jurisdiction,
          legalArea,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessages(m => [...m, { role: 'assistant', content: data.text }])
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.' }])
    }
    setLoading(false)
  }

  const formatText = (text: string) => {
    return text.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '40px 48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <MessageSquare size={22} color="var(--gold)" strokeWidth={1.5} />
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)' }}>Legal Q&amp;A™</h1>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
          {['USA', 'India'].map(j => (
            <button key={j} onClick={() => setJurisdiction(j)} style={{
              padding: '5px 14px', borderRadius: 3, border: '1.5px solid', cursor: 'pointer',
              fontSize: 12, fontWeight: 500, fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
              background: jurisdiction === j ? 'rgba(184,149,42,.1)' : 'transparent',
              borderColor: jurisdiction === j ? 'var(--gold)' : 'var(--border)',
              color: jurisdiction === j ? 'var(--gold)' : 'var(--muted)',
            }}>{j}</button>
          ))}
          <select value={legalArea} onChange={e => setLegalArea(e.target.value)} style={{
            padding: '5px 10px', borderRadius: 3, fontSize: 12,
            background: '#fff', color: 'var(--text)',
            border: '1.5px solid var(--border)', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            {LEGAL_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingRight: 4, marginBottom: 16 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <Scale size={36} color="rgba(184,149,42,.3)" strokeWidth={1} style={{ marginBottom: 16 }} />
            <p className="serif" style={{ fontSize: 20, color: 'var(--muted)', marginBottom: 8, fontWeight: 400 }}>
              How can we help you today?
            </p>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32, fontWeight: 300 }}>
              Ask any legal question — USA or India jurisdiction
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 560, margin: '0 auto' }}>
              {QUICK_Q.map((q, i) => (
                <button key={i} onClick={() => send(q)} style={{
                  padding: '8px 14px', borderRadius: 3,
                  background: '#fff', border: '1px solid var(--border2)',
                  fontSize: 13, color: 'var(--text)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  transition: 'all .18s', fontWeight: 300,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)'; }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 16,
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(184,149,42,.1)', border: '1px solid rgba(184,149,42,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: 10, flexShrink: 0, marginTop: 4,
              }}>
                <Scale size={13} color="var(--gold)" strokeWidth={1.5} />
              </div>
            )}
            <div className={msg.role === 'user' ? 'bubble-user' : 'bubble-ai'} style={{
              padding: '12px 16px', maxWidth: '80%',
              fontSize: 14, lineHeight: 1.65, fontWeight: 300,
            }}>
              {formatText(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(184,149,42,.1)', border: '1px solid rgba(184,149,42,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Scale size={13} color="var(--gold)" strokeWidth={1.5} />
            </div>
            <div className="bubble-ai" style={{ padding: '14px 20px', display: 'flex', gap: 5, alignItems: 'center' }}>
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Ask any legal question... (Enter to send, Shift+Enter for new line)"
          rows={2}
          style={{
            flex: 1, padding: '12px 16px', borderRadius: 3, resize: 'none' as const,
            fontSize: 14, lineHeight: 1.5, border: '1.5px solid var(--border)',
            fontFamily: 'DM Sans, sans-serif', color: 'var(--text)', background: '#fff',
            outline: 'none',
          }}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{
          width: 44, height: 44, borderRadius: 3, background: 'var(--navy)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          opacity: !input.trim() ? .5 : 1, flexShrink: 0, transition: 'all .2s',
        }}>
          <Send size={16} color="var(--cream)" />
        </button>
      </div>
    </div>
  )
}

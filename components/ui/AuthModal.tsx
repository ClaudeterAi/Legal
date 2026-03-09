'use client'
import { useState } from 'react'
import { Scale, X, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Props {
  mode: 'signin' | 'signup'
  onClose: () => void
}

export default function AuthModal({ mode, onClose }: Props) {
  const [tab, setTab] = useState(mode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const submit = async () => {
    if (!email || !pass) return
    setLoading(true)
    setError('')

    try {
      if (tab === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { name: name || email.split('@')[0] } },
        })
        if (err) throw err
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password: pass })
        if (err) throw err
      }
      router.push('/dashboard')
      onClose()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Authentication failed')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 3,
    border: '1.5px solid var(--border)', fontSize: 14,
    fontFamily: 'DM Sans, sans-serif', color: 'var(--text)',
    background: '#fff', outline: 'none', transition: 'border-color .2s',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,31,61,.5)',
      backdropFilter: 'blur(6px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--border)',
        borderRadius: 4, width: '100%', maxWidth: 420, padding: 40,
        position: 'relative',
        animation: 'rise .3s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <Scale size={20} color="var(--gold)" strokeWidth={1.5} />
          <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)' }}>LexAI</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid var(--border2)', marginBottom: 28 }}>
          {[['signin', 'Sign In'], ['signup', 'Create Account']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as 'signin' | 'signup')} style={{
              padding: '10px 20px 10px 0', background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: tab === id ? '2px solid var(--navy)' : '2px solid transparent',
              marginBottom: '-1.5px', fontSize: 14, fontWeight: 600,
              color: tab === id ? 'var(--navy)' : 'var(--muted)',
              fontFamily: 'DM Sans, sans-serif', transition: 'all .18s',
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tab === 'signup' && (
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Full name" style={inputStyle} />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email address" type="email" style={inputStyle} />
          <input value={pass} onChange={e => setPass(e.target.value)}
            placeholder="Password" type="password" style={inputStyle} />

          {error && (
            <p style={{ fontSize: 13, color: 'var(--red)', padding: '8px 12px', background: 'rgba(192,57,43,.07)', borderRadius: 3 }}>
              {error}
            </p>
          )}

          <button onClick={submit} disabled={loading} style={{
            padding: '12px', borderRadius: 3, background: 'var(--navy)', border: 'none',
            color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 4, transition: 'all .22s',
          }}>
            {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Free Account'}
            {!loading && <ArrowRight size={15} />}
          </button>
        </div>

        <p style={{ marginTop: 20, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.6, textAlign: 'center', fontWeight: 300 }}>
          LexAI provides legal information, not legal advice.<br />
          No attorney-client relationship is formed.
        </p>

        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
        }}>
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

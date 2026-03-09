'use client'
import { Scale } from 'lucide-react'

interface Props { onAuth: (m: 'signin' | 'signup') => void }

export default function Navbar({ onAuth }: Props) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(250,250,247,.93)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border2)',
    }}>
      <div style={{
        maxWidth: 1140, margin: '0 auto', padding: '0 32px',
        height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Scale size={20} color="var(--gold)" strokeWidth={1.5} />
          <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--navy)', letterSpacing: .3 }}>LexAI</span>
        </div>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Features', 'Pricing', 'For Law Firms'].map(n => (
            <span key={n}
              style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--muted)', cursor: 'pointer', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--navy)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {n}
            </span>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onAuth('signin')} style={{
            padding: '8px 18px', borderRadius: 3, background: 'transparent',
            border: '1.5px solid var(--border)', color: 'var(--navy)',
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            transition: 'all .2s',
          }}>Sign In</button>
          <button onClick={() => onAuth('signup')} style={{
            padding: '8px 20px', borderRadius: 3, background: 'var(--navy)',
            border: 'none', color: 'var(--cream)',
            fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            transition: 'all .2s',
          }}>Get Started</button>
        </div>
      </div>
    </header>
  )
}

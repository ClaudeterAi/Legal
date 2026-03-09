'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Scale, Home, FileText, MessageSquare, FolderOpen, LogOut, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Props {
  user: User
  profile: Record<string, unknown> | null
  children: React.ReactNode
}

const NAV = [
  { href: '/dashboard',           label: 'Dashboard',         icon: Home },
  { href: '/dashboard/decoder',   label: 'Document Decoder',  icon: FileText },
  { href: '/dashboard/qa',        label: 'Legal Q&A',         icon: MessageSquare },
  { href: '/dashboard/documents', label: 'My Documents',      icon: FolderOpen },
]

export default function DashboardShell({ user, profile, children }: Props) {
  const path = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const displayName = (profile?.name as string) || user.email?.split('@')[0] || 'User'
  const plan = (profile?.plan as string) || 'free'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        borderRight: '1px solid var(--border2)',
        display: 'flex', flexDirection: 'column',
        padding: '0',
        background: '#fff',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Scale size={20} color="var(--gold)" strokeWidth={1.5} />
          <span className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--navy)', letterSpacing: .3 }}>LexAI</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href
            return (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 3, cursor: 'pointer',
                  fontSize: 13.5, fontWeight: active ? 600 : 500,
                  color: active ? 'var(--navy)' : 'var(--muted)',
                  background: active ? 'var(--cream2)' : 'transparent',
                  borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                  transition: 'all .18s',
                }}>
                  <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                  {label}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border2)' }}>
          <div style={{ padding: '10px 12px', marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{displayName}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{user.email}</div>
            <span style={{
              display: 'inline-block', marginTop: 6, padding: '2px 8px', borderRadius: 2,
              background: 'rgba(184,149,42,.1)', color: 'var(--gold)',
              border: '1px solid rgba(184,149,42,.25)',
              fontSize: 10, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' as const,
            }}>{plan} Plan</span>
          </div>
          <button onClick={signOut} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '9px 12px', borderRadius: 3, cursor: 'pointer',
            fontSize: 13.5, fontWeight: 500, color: 'var(--muted)',
            background: 'transparent', border: 'none',
            fontFamily: 'DM Sans, sans-serif', transition: 'all .18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream2)'; e.currentTarget.style.color = 'var(--navy)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}>
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}

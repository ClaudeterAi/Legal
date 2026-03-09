'use client'
import { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Stats from './Stats'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Jurisdictions from './Jurisdictions'
import Pricing from './Pricing'
import Footer from './Footer'
import AuthModal from '@/components/ui/AuthModal'

export default function Landing() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null)
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navbar onAuth={setAuthMode} />
      <Hero onAuth={setAuthMode} />
      <Stats />
      <Features />
      <HowItWorks />
      <Jurisdictions />
      <Pricing onAuth={setAuthMode} />
      <Footer />
      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}
    </div>
  )
}

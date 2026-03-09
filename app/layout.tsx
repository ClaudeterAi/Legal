import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LexAI — AI Legal Platform for USA & India',
  description: 'AI-powered legal clarity. Decode documents, know your rights, draft contracts. $19/month instead of $400/hr.',
  keywords: 'legal AI, AI lawyer, legal documents, contract analysis, legal advice India USA',
  openGraph: {
    title: 'LexAI — Your Lawyer. Everywhere. Always.',
    description: 'AI-powered legal help for real people. USA + India.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

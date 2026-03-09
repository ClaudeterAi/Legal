import { getAnthropicClient, CLAUDE_MODEL } from '@/lib/anthropic'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { messages, jurisdiction, legalArea } = await req.json()

    const system = `You are LexAI — an expert AI legal assistant covering USA and India law.

JURISDICTION: ${jurisdiction || 'USA'}
LEGAL AREA: ${legalArea || 'General'}

Your role:
- Provide clear, accurate legal INFORMATION (not legal advice — state this clearly when relevant)
- Cite specific laws, statutes, and sections (e.g. "Under Section 125 CrPC..." or "Under FLSA...")
- Be conversational but authoritative — like a knowledgeable lawyer friend
- Always specify which jurisdiction your answer applies to
- Flag when a matter is serious enough to require a real attorney
- Use plain English — explain any necessary legal terms
- Format responses clearly with short paragraphs

Always end with: "⚖️ This is legal information, not legal advice. For your specific situation, consult a licensed attorney."`

    const anthropic = getAnthropicClient()
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system,
      messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    await supabase.rpc('increment_qa', { uid: user.id })

    return NextResponse.json({ text })
  } catch (e) {
    console.error('QA error:', e)
    return NextResponse.json({ error: 'Failed to process question.' }, { status: 500 })
  }
}

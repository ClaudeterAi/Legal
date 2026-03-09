import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const SYSTEM = `You are LexAI's Document Decoder — an elite legal analyst.
Analyze the provided legal document and return ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "type": "Document type (e.g. Rental Agreement, NDA, Employment Contract, Court Notice)",
  "jurisdiction": "Detected or stated jurisdiction",
  "summary": "2-3 sentence plain English summary of what this document is and does",
  "riskScore": 1-5,
  "keyPoints": ["4-6 most important things to know"],
  "redFlags": ["2-4 concerning clauses — empty array if none"],
  "obligations": ["2-4 key obligations or dates"],
  "recommendation": "One clear sentence: what should this person do next"
}
riskScore: 1=minimal risk, 5=urgent legal action needed. Be concise and genuinely helpful.`

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { text, jurisdiction } = await req.json()
    if (!text) return NextResponse.json({ error: 'No document text provided' }, { status: 400 })

    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      system: `${SYSTEM}\nJurisdiction context: ${jurisdiction || 'USA'}`,
      messages: [{ role: 'user', content: `Analyze this legal document:\n\n${text.slice(0, 6000)}` }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(cleaned)

    // Save to DB
    await supabase.from('documents').insert({
      user_id: user.id,
      title: result.type || 'Decoded Document',
      original_text: text.slice(0, 5000),
      analysis: result,
      jurisdiction: jurisdiction || 'USA',
      doc_type: result.type,
      risk_score: result.riskScore,
    })

    // Increment usage counter
    await supabase.rpc('increment_decodes', { uid: user.id })

    return NextResponse.json(result)
  } catch (e) {
    console.error('Decode error:', e)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}

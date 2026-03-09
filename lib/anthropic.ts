import Anthropic from '@anthropic-ai/sdk'

// Lazy-initialize so build doesn't fail without the key
let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
    _client = new Anthropic({ apiKey })
  }
  return _client
}

export const CLAUDE_MODEL = 'claude-sonnet-4-20250514'

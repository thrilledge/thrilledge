import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { auth } from '@clerk/nextjs/server'
import { checkUsage, incrementUsage } from '@/lib/usage'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert cold calling script writer. Write scripts that book meetings.

STRUCTURE:
1. OPENING (5 seconds): Name + company + permission-based opener ("Got 30 seconds?")
2. HOOK: One-liner about a specific problem/result relevant to them
3. BRIDGE: How you help (1 sentence)
4. OBJECTION HANDLING: Prepare for top 2 objections with responses
5. CALL-TO-ACTION: Specific next step ("Does Tuesday at 2pm work?")

RULES:
- Keep total script under 300 words
- Use natural speech, not corporate jargon
- Include [PAUSE] and [LISTEN] markers at key moments
- Never read like a monologue — it's a conversation starter
- Tone: confident, helpful, not pushy`

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prospectRole, prospectIndustry, yourOffer, commonObjections } = await req.json()

    if (!yourOffer) {
      return NextResponse.json({ error: 'Your offer/service is required' }, { status: 400 })
    }

    const { allowed, plan } = await checkUsage(userId, 'cold-call')
    if (!allowed) {
      return NextResponse.json({ error: 'Monthly limit reached', plan }, { status: 402 })
    }

    const userPrompt = `Prospect Role: ${prospectRole || 'Not specified'}\nIndustry: ${prospectIndustry || 'Not specified'}\nYour Offer: ${yourOffer}\nCommon Objections: ${commonObjections || 'Not specified'}\n\nWrite a cold calling script for reaching out to this prospect.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    })

    const script = completion.choices[0]?.message?.content?.trim() || ''

    await incrementUsage(userId, 'cold-call')

    return NextResponse.json({ script, plan })
  } catch (err) {
    console.error('[Cold Call API] Error:', err)
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 })
  }
}

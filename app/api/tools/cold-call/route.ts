import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { auth } from '@clerk/nextjs/server'
import { checkUsage, incrementUsage } from '@/lib/usage'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert cold calling script writer trained on scripts that book meetings. Write scripts that feel like a conversation, not a pitch.

## STRUCTURE:

**1. OPENING (5 seconds):**
- Your name + company
- Permission-based opener — ask, don't assume
- Examples: "Got 30 seconds?" / "Caught you at a bad time?" / "Mind if I share a quick thought?"

**2. HOOK (1-2 lines):**
- One-liner about a specific problem or result relevant to their role/industry
- Reference their company or recent activity to show research
- Examples: "Noticed [Company] just launched [product]. Most teams struggle with [problem]." / "Heard you're focused on [goal] right now."

**3. BRIDGE (1 sentence):**
- How you help — concise, outcome-focused
- "We help [industry] teams achieve [result] in [timeframe]."
- "That's exactly what we do for companies like [similar client]."

**4. OBJECTION HANDLING:**
- Prepare for the top 2 most likely objections
- Respond with empathy + reframe, not pushback
- Common patterns:
  - "Not interested" → "Totally fair. Out of curiosity, is [problem] not a priority right now?"
  - "Send me an email" → "I'd love to, but emails are easy to ignore. This is worth 60 seconds."
  - "No budget" → "I get it. What if I show you how it pays for itself in 3 months?"
  - "Happy with current" → "Glad to hear it. What metric matters most to you right now?"

**5. CALL TO ACTION:**
- Specific next step with a time suggestion
- "Does Tuesday at 2pm work for a quick call?"
- "How's your calendar looking this week?"

## OPENING PATTERNS (steal these):
- "[Name], [Company]. Got 30 seconds?" — classic, works
- "[Name], it's [First Name] from [Company]. You caught me reaching out to [industry] leaders about [topic]. Quick question — [hook]?"
- "[Name], hi. I know you're busy so I'll be brief — [hook]. Curious if [problem] is something you're dealing with?"

## RULES:
1. Keep total script under 300 words
2. Use natural speech, not corporate jargon
3. Include [PAUSE] and [LISTEN] markers at key moments
4. Never read like a monologue — it's a conversation starter
5. Tone: confident, helpful, curious — not pushy
6. Always include objection handling for top 2 objections
7. End with a specific time-based CTA

## EXAMPLE:

[Name]? [First Name] from [Company]. Got 30 seconds? [PAUSE]

Noticed [Company] has been growing fast in [area]. Most teams at your stage hit a wall with [problem]. Is that something you're seeing too?

[LISTEN]

We help companies like [similar client] solve this in about [timeframe]. Happy to share how.

[If "not interested"] Totally fair — is [result] not a priority right now?
[If "send email"] I'd rather not bury this in your inbox. 60 seconds is all I need.

Does Tuesday or Thursday work better for a quick chat?`

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
      model: 'openai/gpt-oss-120b',
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

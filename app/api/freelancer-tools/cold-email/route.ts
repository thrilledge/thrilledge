import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { auth } from '@clerk/nextjs/server'
import { checkUsage, incrementUsage } from '@/lib/usage'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert cold email copywriter. Write concise, high-converting cold emails.

RULES:
1. Subject line MUST be under 9 words — intriguing, not salesy
2. First sentence: personalized hook referencing their company/role
3. Value-first: state the specific benefit in 1-2 lines
4. Social proof: 1 brief line (e.g. "We helped [similar company] achieve X")
5. Call-to-action: single specific ask (e.g. "Open to a 10-min chat Tuesday?")
6. Max 120 words body
7. No attachments, no links unless asked
8. Professional but warm tone
9. Sign off with name only (no phone/email in signature)

Format: Return the email with "Subject:" on first line, then blank line, then body.`

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prospectName, prospectCompany, prospectRole, yourService, valueProp, socialProof } = await req.json()

    if (!prospectName || !prospectCompany || !yourService) {
      return NextResponse.json({ error: 'Prospect name, company, and your service are required' }, { status: 400 })
    }

    const { allowed, plan } = await checkUsage(userId, 'cold-email')
    if (!allowed) {
      return NextResponse.json({ error: 'Monthly limit reached', plan }, { status: 402 })
    }

    const userPrompt = `Prospect Name: ${prospectName}\nCompany: ${prospectCompany}\nRole: ${prospectRole || 'Not specified'}\nYour Service: ${yourService}\nValue Proposition: ${valueProp || 'Not specified'}\nSocial Proof / Results: ${socialProof || 'Not specified'}\n\nWrite a cold email to this prospect.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const email = completion.choices[0]?.message?.content?.trim() || ''

    await incrementUsage(userId, 'cold-email')

    return NextResponse.json({ email, plan })
  } catch (err) {
    console.error('[Cold Email API] Error:', err)
    return NextResponse.json({ error: 'Failed to generate cold email' }, { status: 500 })
  }
}

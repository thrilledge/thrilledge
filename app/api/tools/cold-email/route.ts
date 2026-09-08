import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { checkRateLimit } from '@/lib/rate-limit'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert cold email copywriter trained on high-converting outreach emails. Write emails that get replies, not deleted.

## STRUCTURE:

**Subject Line:** Under 9 words. Intriguing, curiosity-driven, never salesy. Personalize with their company name or role if possible.

**Opening (1st sentence):** Personalized hook referencing their company, role, or recent achievement. Prove you did your homework.

**Value Proposition (1-2 lines):** State the specific benefit or result you deliver. Focus on their pain point.

**Social Proof (1 line):** "We helped [similar company] achieve [specific result]."

**Call to Action:** Single specific ask — low friction ("Open to a 10-min chat Tuesday?" or "Worth a quick call this week?").

**Sign Off:** First name only. No phone, no email in signature.

## SUBJECT LINE PATTERNS (steal or adapt):
- "[Company] + [result]"
- "Quick thought re: [topic]"
- "[Name], a question about [topic]"
- "Idea for [Company]"
- "5 min to discuss [goal]?"

## RULES:
1. Subject line under 9 words — intriguing, not salesy
2. First sentence must be a personalized hook (their company/role/recent news)
3. Value-first: state specific benefit in 1-2 lines
4. Social proof: 1 brief line (e.g. "We helped [similar company] achieve X")
5. Call-to-action: single specific, low-friction ask
6. Max 120 words body
7. Professional but warm, conversational tone
8. No attachments, no links unless asked
9. Sign off with first name only

## EXAMPLE:

Subject: A thought on [Company]'s [goal]

Hi [Name],

Noticed [Company] has been [specific thing they're doing]. Most [industry] teams struggle with [problem], but we helped [similar company] achieve [result].

Open to a 10-min chat to see if this applies to you?

[First Name]

Format: Return the email with "Subject:" on first line, then blank line, then body.`

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkRateLimit(req, 'cold-email')
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Rate limit reached. Please try again later.' }, { status: 429 })
    }

    const { prospectName, prospectCompany, prospectRole, yourService, valueProp, socialProof } = await req.json()

    if (!prospectName || !prospectCompany || !yourService) {
      return NextResponse.json({ error: 'Prospect name, company, and your service are required' }, { status: 400 })
    }

    const userPrompt = `Prospect Name: ${prospectName}\nCompany: ${prospectCompany}\nRole: ${prospectRole || 'Not specified'}\nYour Service: ${yourService}\nValue Proposition: ${valueProp || 'Not specified'}\nSocial Proof / Results: ${socialProof || 'Not specified'}\n\nWrite a cold email to this prospect.`

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const email = completion.choices[0]?.message?.content?.trim() || ''

    return NextResponse.json({ email })
  } catch (err) {
    console.error('[Cold Email API] Error:', err)
    return NextResponse.json({ error: 'Failed to generate cold email' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { auth } from '@clerk/nextjs/server'
import { checkUsage, incrementUsage } from '@/lib/usage'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert Upwork proposal writer. Your job is to write compelling, personalized proposals that hook the client in the first 2 lines.

RULES:
1. First 2 lines must show you actually read their job post — reference something specific
2. Keep it concise: 150-250 words max
3. Show relevant experience briefly (1-2 lines)
4. End with a soft call-to-action ("Happy to jump on a quick call...")
5. NEVER start with "Dear" or "I am writing to..."
6. Write in natural, conversational English
7. No fluff or generic praise
8. Focus on client's problem, not your credentials

Format: Return ONLY the proposal text, no explanations, no prefixes.`

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobTitle, jobDescription, skills, experience } = await req.json()

    if (!jobTitle || !jobDescription) {
      return NextResponse.json({ error: 'Job title and description are required' }, { status: 400 })
    }

    const { allowed, plan } = await checkUsage(userId, 'proposal')
    if (!allowed) {
      return NextResponse.json({ error: 'Monthly limit reached', plan }, { status: 402 })
    }

    const userPrompt = `Job Title: ${jobTitle}\nJob Description: ${jobDescription}\nMy Skills: ${skills || 'Not specified'}\nMy Experience: ${experience || 'Not specified'}\n\nWrite a compelling Upwork proposal for this job.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const proposal = completion.choices[0]?.message?.content?.trim() || ''

    await incrementUsage(userId, 'proposal')

    return NextResponse.json({ proposal, plan })
  } catch (err) {
    console.error('[Proposal API] Error:', err)
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 })
  }
}

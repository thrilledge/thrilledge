export interface ToolGenerationInput {
  tool_type: 'proposal' | 'cold-email' | 'cold-call'
  input_data: Record<string, string>
  output_data: string
}

export interface ToolGenerationRecord {
  id: string
  tool_type: string
  input_data: string
  output_data: string
  created_at: string
}

export async function saveToolGeneration(data: ToolGenerationInput): Promise<boolean> {
  try {
    const res = await fetch('/api/tools/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  } catch (err) {
    console.error('[Tool History] Save failed:', err)
    return false
  }
}

export async function getToolHistory(limit = 50): Promise<ToolGenerationRecord[]> {
  try {
    const res = await fetch(`/api/tools/history?limit=${limit}`)
    if (!res.ok) return []
    const data = await res.json()
    return data.history || []
  } catch (err) {
    console.error('[Tool History] Fetch failed:', err)
    return []
  }
}

export async function seedHistory(): Promise<number> {
  const samples = {
    proposal: [
      { jobTitle: 'React Developer for E-commerce', jobDescription: 'Build analytics dashboard with Stripe integration', skills: 'React, TypeScript, Stripe', experience: '5 years' },
      { jobTitle: 'WordPress Developer', jobDescription: 'Custom theme with ACF and WooCommerce', skills: 'WordPress, PHP, WooCommerce', experience: '30+ themes built' },
      { jobTitle: 'React Native Developer', jobDescription: 'Cross-platform fitness tracking app', skills: 'React Native, Firebase, Redux', experience: '2 published apps' },
      { jobTitle: 'Python Backend Developer', jobDescription: 'REST APIs for SaaS platform', skills: 'Python, FastAPI, PostgreSQL', experience: '100k+ daily requests' },
      { jobTitle: 'UI/UX Designer', jobDescription: 'Redesign B2B SaaS dashboard', skills: 'Figma, Design Systems', experience: '3 SaaS products' },
    ],
    'cold-email': [
      { prospectName: 'Sarah Chen', prospectCompany: 'TechFlow Inc', prospectRole: 'CTO', yourService: 'Cloud optimization', valueProp: 'Reduce AWS costs 40%', socialProof: 'Saved $120k/year' },
      { prospectName: 'James Wilson', prospectCompany: 'GrowthLab', prospectRole: 'Marketing Director', yourService: 'AI lead generation', valueProp: '3x more leads', socialProof: '300% ROI' },
      { prospectName: 'Maria Rodriguez', prospectCompany: 'BuildRight', prospectRole: 'VP Ops', yourService: 'Project management software', valueProp: '50% less delays', socialProof: 'Saved $2M' },
      { prospectName: 'Alex Kim', prospectCompany: 'NovaHealth', prospectRole: 'Head of Eng', yourService: 'Cloud migration', valueProp: '6-week migration', socialProof: 'Zero downtime' },
      { prospectName: 'Lisa Thompson', prospectCompany: 'EcoPack', prospectRole: 'CEO', yourService: 'Sustainable packaging', valueProp: '30% cost reduction', socialProof: 'Award winner' },
    ],
    'cold-call': [
      { prospectRole: 'CEO', prospectIndustry: 'SaaS', yourOffer: 'AI support automation', commonObjections: 'Already have team' },
      { prospectRole: 'Sales Director', prospectIndustry: 'Real Estate', yourOffer: 'Virtual tour platform', commonObjections: 'Use photos already' },
      { prospectRole: 'HR Head', prospectIndustry: 'Healthcare', yourOffer: 'Credential tracking', commonObjections: 'Budget frozen' },
      { prospectRole: 'Ops Manager', prospectIndustry: 'Logistics', yourOffer: 'Fleet tracking', commonObjections: 'Too expensive' },
      { prospectRole: 'Marketing Director', prospectIndustry: 'E-commerce', yourOffer: 'AI personalization', commonObjections: 'No dev resources' },
    ],
  }

  const tools: Array<'proposal' | 'cold-email' | 'cold-call'> = ['proposal', 'cold-email', 'cold-call']
  let total = 0

  for (const toolType of tools) {
    const inputs = samples[toolType]
    for (let i = 0; i < 20; i++) {
      const input = inputs[i % inputs.length]
      await saveToolGeneration({
        tool_type: toolType,
        input_data: { ...input },
        output_data: `Generated ${toolType} #${i + 1} — sample output for testing.`,
      })
      total++
    }
  }

  return total
}

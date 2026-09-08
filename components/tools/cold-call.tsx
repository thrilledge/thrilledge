'use client'

import { useState } from 'react'
import { Copy, Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { saveToolGeneration } from '@/lib/tool-history-client'

export function ColdCall() {
  const [prospectRole, setProspectRole] = useState('')
  const [prospectIndustry, setProspectIndustry] = useState('')
  const [yourOffer, setYourOffer] = useState('')
  const [commonObjections, setCommonObjections] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult('')

    try {
      const res = await fetch('/api/tools/cold-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectRole, prospectIndustry, yourOffer, commonObjections }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError('Rate limit reached. Please wait a minute and try again.')
          return
        }
        throw new Error(data.error || 'Failed to generate')
      }

      setResult(data.script)
      await saveToolGeneration({
        tool_type: 'cold-call',
        input_data: { prospectRole: prospectRole || '', prospectIndustry: prospectIndustry || '', yourOffer, commonObjections: commonObjections || '' },
        output_data: data.script,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input form */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={18} className="text-neutral-600" />
          <h2 className="text-lg font-semibold text-[#111212]">Script Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prospect Role</label>
            <input
              type="text"
              value={prospectRole}
              onChange={(e) => setProspectRole(e.target.value)}
              placeholder="e.g. CEO, Marketing Director"
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prospect Industry</label>
            <input
              type="text"
              value={prospectIndustry}
              onChange={(e) => setProspectIndustry(e.target.value)}
              placeholder="e.g. SaaS, Healthcare, E-commerce"
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Your Offer / Service *</label>
            <textarea
              value={yourOffer}
              onChange={(e) => setYourOffer(e.target.value)}
              placeholder="What are you selling? Be specific about the outcome."
              rows={3}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Common Objections</label>
            <textarea
              value={commonObjections}
              onChange={(e) => setCommonObjections(e.target.value)}
              placeholder="e.g. Not interested, Send me an email, No budget"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full flex items-center justify-center gap-2 bg-[#111212] text-white font-semibold text-sm rounded-xl py-3 transition-all duration-200',
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
            )}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Writing script...</>
            ) : (
              <><Sparkles size={16} /> Generate Script</>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Result panel */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-neutral-600" />
            <h2 className="text-lg font-semibold text-[#111212]">Your Script</h2>
          </div>
          {result && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        <div className={cn(
          'min-h-[300px] rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap',
          result ? 'bg-neutral-50 border border-neutral-200 text-neutral-800' : 'bg-neutral-50 border border-dashed border-neutral-300 text-neutral-400 flex items-center justify-center'
        )}>
          {result || 'Your generated script will appear here...'}
        </div>
      </div>
    </div>
  )
}

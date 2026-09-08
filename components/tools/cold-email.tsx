'use client'

import { useState } from 'react'
import { Copy, Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { saveToolGeneration } from '@/lib/tool-history-client'

export function ColdEmail() {
  const [prospectName, setProspectName] = useState('')
  const [prospectCompany, setProspectCompany] = useState('')
  const [prospectRole, setProspectRole] = useState('')
  const [yourService, setYourService] = useState('')
  const [valueProp, setValueProp] = useState('')
  const [socialProof, setSocialProof] = useState('')
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
      const res = await fetch('/api/tools/cold-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectName, prospectCompany, prospectRole, yourService, valueProp, socialProof }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError('Rate limit reached. Please wait a minute and try again.')
          return
        }
        throw new Error(data.error || 'Failed to generate')
      }

      setResult(data.email)
      await saveToolGeneration({
        tool_type: 'cold-email',
        input_data: { prospectName, prospectCompany, prospectRole: prospectRole || '', yourService, valueProp: valueProp || '', socialProof: socialProof || '' },
        output_data: data.email,
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
          <h2 className="text-lg font-semibold text-[#111212]">Prospect Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prospect Name *</label>
              <input
                type="text"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                placeholder="e.g. John Smith"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company *</label>
              <input
                type="text"
                value={prospectCompany}
                onChange={(e) => setProspectCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Prospect Role</label>
            <input
              type="text"
              value={prospectRole}
              onChange={(e) => setProspectRole(e.target.value)}
              placeholder="e.g. Head of Engineering, CEO"
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Your Service *</label>
            <input
              type="text"
              value={yourService}
              onChange={(e) => setYourService(e.target.value)}
              placeholder="e.g. Web Development, AI Consulting"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Value Proposition</label>
            <textarea
              value={valueProp}
              onChange={(e) => setValueProp(e.target.value)}
              placeholder="What specific result/benefit do you deliver?"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Social Proof / Results</label>
            <textarea
              value={socialProof}
              onChange={(e) => setSocialProof(e.target.value)}
              placeholder="e.g. Helped similar company achieve 40% faster delivery"
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
              <><Loader2 size={16} className="animate-spin" /> Writing email...</>
            ) : (
              <><Sparkles size={16} /> Generate Cold Email</>
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
            <h2 className="text-lg font-semibold text-[#111212]">Your Cold Email</h2>
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
          'min-h-[300px] rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono',
          result ? 'bg-neutral-50 border border-neutral-200 text-neutral-800' : 'bg-neutral-50 border border-dashed border-neutral-300 text-neutral-400 flex items-center justify-center'
        )}>
          {result || 'Your generated cold email will appear here...'}
        </div>
      </div>
    </div>
  )
}

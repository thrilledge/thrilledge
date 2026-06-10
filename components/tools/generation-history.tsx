'use client'

import { useEffect, useState } from 'react'
import { Loader2, Copy, Check, Clock, FileText, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { getToolHistory, seedHistory } from '@/lib/tool-history-client'

interface HistoryRecord {
  id: string
  tool_type: string
  input_data: string
  output_data: string
  created_at: string
}

const TOOL_ICONS: Record<string, string> = {
  proposal: '✍️',
  'cold-email': '📧',
  'cold-call': '📞',
}

const TOOL_LABELS: Record<string, string> = {
  proposal: 'Upwork Proposal',
  'cold-email': 'Cold Email',
  'cold-call': 'Cold Call Script',
}

export function GenerationHistory() {
  const [records, setRecords] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const loadHistory = async () => {
    const data = await getToolHistory()
    setRecords(data)
    setLoading(false)
  }

  useEffect(() => { loadHistory() }, [])

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSeed = async () => {
    const total = await seedHistory()
    await loadHistory()
    alert(`Generated ${total} sample records!`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading history...
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-neutral-500" />
          <span className="text-sm text-neutral-500">{records.length} past generation{records.length !== 1 ? 's' : ''}</span>
        </div>
        {records.length === 0 && (
          <button
            onClick={handleSeed}
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 bg-white border border-[#e5e5e5] rounded-xl px-4 py-2 hover:bg-neutral-50 transition-colors"
          >
            <Sparkles size={14} /> Generate Sample Data
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <FileText size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No generation history yet.</p>
          <p className="text-xs mt-1">Use the tools above to generate proposals, emails, or scripts.</p>
        </div>
      ) : (
        records.map((record) => {
          const isExpanded = expandedId === record.id
          let inputPreview = ''
          try {
            const parsed = JSON.parse(record.input_data)
            inputPreview = Object.entries(parsed)
              .filter(([_, v]) => v && v !== 'Not specified')
              .map(([k, v]) => `${k}: ${v}`)
              .join(' | ')
          } catch {
            inputPreview = record.input_data
          }

          const date = new Date(record.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
          })

          return (
            <div key={record.id} className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg shrink-0">{TOOL_ICONS[record.tool_type] || '📄'}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-neutral-800 truncate">
                      {TOOL_LABELS[record.tool_type] || record.tool_type}
                    </div>
                    <div className="text-xs text-neutral-400 truncate mt-0.5">{inputPreview}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-neutral-400">{date}</span>
                  {isExpanded ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[#e5e5e5] px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Generated Output</span>
                    <button
                      onClick={() => handleCopy(record.output_data, record.id)}
                      className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {copiedId === record.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === record.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap text-neutral-800 max-h-96 overflow-y-auto">
                    {record.output_data}
                  </div>
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

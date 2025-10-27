"use client"
import { useEffect, useState } from "react"

export default function ReadmePane() {
  const [text, setText] = useState<string>("")
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    // 假装从 /api/readme 拉
    setText(`# NOF1 — README

This is a demo README. Replace with your product intro, rules, and notes.

- Live status shows server connectivity.
- Account chart streams updates via WebSocket.
- Leaderboard and models are updated periodically.

Use this page for explanations, rules, FAQs, etc.
`)
  }, [])
  const short = text.length > 800 && !expanded
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 font-mono text-sm leading-relaxed">
      <pre className={`whitespace-pre-wrap ${short ? "max-h-80 overflow-hidden" : ""}`}>{text}</pre>
      {text.length>800 && (
        <button onClick={()=>setExpanded(!expanded)} className="mt-3 text-xs px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-900">
          {expanded ? "Show less" : "Show full README"}
        </button>
      )}
    </div>
  )
}

"use client"
import { useEffect, useRef, useState } from "react"
import { useModelChatStore } from "@/lib/stores/modelchat"

export default function ModelChat() {
  const { items, loading, fetch } = useModelChatStore()
  const [autoScroll, setAutoScroll] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => { fetch() }, [])
  useEffect(() => {
    if (autoScroll && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [items, autoScroll])

  if (loading && items.length===0) {
    return <div className="space-y-2">{Array.from({length:4}).map((_,i)=><div key={i} className="h-16 rounded-xl bg-zinc-900/60 border border-zinc-800" />)}</div>
  }
  if (!items.length) return <div className="text-sm text-zinc-400 p-6 text-center">No logs yet.</div>

  return (
    <div className="relative">
      <div ref={listRef} className="max-h-[420px] overflow-auto pr-1">
        <div className="space-y-3">
          {items.map(m => (
            <div key={m.id} className={`rounded-2xl p-3 border ${m.role==="model" ? "bg-zinc-800/80 border-zinc-700" : m.role==="system" ? "bg-indigo-900/30 border-indigo-800/40" : "bg-zinc-900/60 border-zinc-800"}`}>
              <div className="text-xs text-zinc-400 mb-1">{m.role.toUpperCase()} {m.model ? `· ${m.model}` : ""} — {new Date(m.t).toLocaleString()}</div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          ))}
        </div>
      </div>
      {!autoScroll && (
        <button onClick={()=>setAutoScroll(true)} className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded-lg border border-zinc-700 bg-zinc-900/70">Jump to latest</button>
      )}
    </div>
  )
}

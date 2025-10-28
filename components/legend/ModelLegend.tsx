"use client"
import { useEffect, useState } from "react"

type Item = { slug:string; name:string; color:string; last:{t:string; v:number} }

export default function ModelLegend() {
  const [items,setItems] = useState<Item[]>([])
  useEffect(()=>{ fetch("/api/metrics/multi-account-value?mode=$&range=ALL",{cache:"no-store"})
    .then(r=>r.json()).then(d=>setItems(d.models)) },[])
  if(!items.length) return null
  return (
    <div className="mt-2 rounded-xl border border-zinc-800 bg-zinc-900/70 p-2 flex flex-wrap gap-2">
      {items.map(m=>(
        <div key={m.slug} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full" style={{background:m.color}}/>
          <span className="text-xs font-semibold">{m.name}</span>
          <span className="ml-1 text-[11px] opacity-80">${m.last.v.toLocaleString(undefined,{maximumFractionDigits:2})}</span>
        </div>
      ))}
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import { usePositionsStore } from "@/lib/stores/positions"
import { fmtCurrency, fmtNumber } from "@/lib/utils/format"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function PositionsView() {
  const { items, loading, fetchAll } = usePositionsStore()
  const [view, setView] = useState<"cards"|"table">("cards")
  useEffect(() => { fetchAll() }, [])
  if (loading && items.length===0) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-32 w-full rounded-xl"/>)}</div>
  }
  if (!items.length) return <div className="text-sm text-zinc-400 p-6 text-center">No positions.</div>
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button className={`text-xs px-3 py-1 rounded-lg border ${view==="cards"?"bg-zinc-900":""}`} onClick={()=>setView("cards")}>Cards</button>
        <button className={`text-xs px-3 py-1 rounded-lg border ${view==="table"?"bg-zinc-900":""}`} onClick={()=>setView("table")}>Table</button>
      </div>
      {view==="cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((p,i)=>(
            <div key={i} className="rounded-2xl p-4 bg-zinc-900/70 hover:bg-zinc-900 transition border border-zinc-800/60">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.sym} <span className="text-zinc-400 font-normal text-xs">/ {p.name}</span></div>
                <Link href={`/models/${p.slug}`} className="text-violet-300 text-xs hover:underline">View Model</Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <Stat label="Qty" value={fmtNumber(p.qty)} />
                <Stat label="Avg Px" value={fmtCurrency(p.avgPx)} />
                <Stat label="Last Px" value={fmtCurrency(p.lastPx)} />
                <Stat label="PnL" value={fmtCurrency(p.pnl)} className={p.pnl>=0?"text-emerald-400":"text-rose-400"} />
                <Stat label="Mkt Value" value={fmtCurrency(p.value)} />
                <Stat label="Exposure" value={(p.exposure*100).toFixed(1)+"%"} />
              </div>
              <div className="mt-2 text-xs text-zinc-500">Updated {new Date(p.updated).toLocaleTimeString([], {hour12:false})}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="py-2 text-left">Symbol</th><th className="py-2 text-left">Model</th>
                <th className="py-2 text-right">Qty</th><th className="py-2 text-right">Avg Px</th>
                <th className="py-2 text-right">Last Px</th><th className="py-2 text-right">PnL</th>
                <th className="py-2 text-right">Mkt Value</th><th className="py-2 text-right">Exposure</th><th className="py-2 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p,i)=>(
                <tr key={i} className="border-b border-zinc-900">
                  <td className="py-2">{p.sym}</td>
                  <td className="py-2"><Link href={`/models/${p.slug}`} className="text-violet-300 hover:underline">{p.model}</Link></td>
                  <td className="py-2 text-right">{fmtNumber(p.qty)}</td>
                  <td className="py-2 text-right">{fmtCurrency(p.avgPx)}</td>
                  <td className="py-2 text-right">{fmtCurrency(p.lastPx)}</td>
                  <td className={`py-2 text-right ${p.pnl>=0?"text-emerald-400":"text-rose-400"}`}>{fmtCurrency(p.pnl)}</td>
                  <td className="py-2 text-right">{fmtCurrency(p.value)}</td>
                  <td className="py-2 text-right">{(p.exposure*100).toFixed(1)}%</td>
                  <td className="py-2">{new Date(p.updated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
function Stat({label, value, className}:{label:string; value:string; className?:string}) {
  return (
    <div className="rounded-lg border border-zinc-800 p-2">
      <div className="text-[11px] uppercase text-zinc-400">{label}</div>
      <div className={`font-medium ${className}`}>{value}</div>
    </div>
  )
}

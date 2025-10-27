"use client"
import { useEffect } from "react"
import { useTradesStore } from "@/lib/stores/trades"
import { fmtCurrency, fmtNumber } from "@/lib/utils/format"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function CompletedTradesTable() {
  const { items, loading, fetchNext } = useTradesStore()
  useEffect(() => { fetchNext() }, [])
  if (loading && items.length === 0) {
    return <div className="space-y-2">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-10 w-full rounded-lg"/>)}</div>
  }
  if (!items.length) {
    return <div className="text-sm text-zinc-400 p-6 text-center">No completed trades yet — come back later.</div>
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-zinc-400">
          <tr className="border-b border-zinc-800">
            <th className="py-2 text-left">Time</th>
            <th className="py-2 text-left">Model</th>
            <th className="py-2 text-left">Symbol</th>
            <th className="py-2 text-left">Side</th>
            <th className="py-2 text-right">Qty</th>
            <th className="py-2 text-right">Price</th>
            <th className="py-2 text-right">PnL</th>
            <th className="py-2 text-left">Txn</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/50">
              <td className="py-2">{new Date(r.t).toLocaleString()}</td>
              <td className="py-2"><Link href={`/models/${r.slug}`} className="text-violet-300 hover:underline">{r.model}</Link></td>
              <td className="py-2">{r.sym}</td>
              <td className="py-2">
                <span className={`px-2 py-0.5 rounded-md ${r.side==="Buy" ? "bg-emerald-900/30 text-emerald-300" : "bg-rose-900/30 text-rose-300"}`}>{r.side}</span>
              </td>
              <td className="py-2 text-right">{fmtNumber(r.qty)}</td>
              <td className="py-2 text-right">{fmtCurrency(r.px)}</td>
              <td className={`py-2 text-right ${r.pnl>=0 ? "text-emerald-400" : "text-rose-400"}`}>{fmtCurrency(r.pnl)}</td>
              <td className="py-2">{r.txn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center py-3">
        <button onClick={() => fetchNext()} className="text-xs px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-900">Load more</button>
      </div>
    </div>
  )
}

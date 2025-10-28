"use client"
import { useEffect, useState } from "react"

type Item = {
  id:string; modelSlug:string; modelName:string; modelIcon:string;
  sym:string; symIcon:string; side:"long"|"short"; price:[number,number];
  qty:number; notional:[number,number]; holding:string; pnl:number; t:string
}

export default function TradesFeed() {
  const [items,setItems] = useState<Item[]>([])
  const [model,setModel] = useState<string>("ALL")
  useEffect(()=>{ fetch("/api/trades/recent",{cache:"no-store"}).then(r=>r.json()).then(d=>setItems(d.items)) },[])
  const view = items.filter(i => model==="ALL" || i.modelSlug===model)

  return (
    <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800/60 p-3 h-[540px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-medium">FILTER:
          <select className="ml-2 rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs"
                  value={model} onChange={e=>setModel(e.target.value)}>
            <option value="ALL">ALL MODELS</option>
            {[...new Set(items.map(i=>`${i.modelSlug}|${i.modelName}`))]
              .map(s=>s.split("|")).map(([slug,name])=>(
                <option key={slug} value={slug}>{name}</option>
            ))}
          </select>
        </div>
        <div className="text-[11px] text-zinc-400">Showing Last {view.length} Trades</div>
      </div>
      <div className="flex-1 overflow-auto space-y-2 pr-1">
        {view.map(i=>(
          <div key={i.id} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
            <div className="flex items-center justify-between">
              <div className="text-[13px]">
                <b className="mr-1">{i.modelName}</b>
                completed a <b className={i.side==="long"?"text-emerald-400":"text-rose-400"}>{i.side}</b> trade on {i.symIcon} <b>{i.sym}</b>
              </div>
              <div className="text-[11px] text-zinc-400">{new Date(i.t).toLocaleString()}</div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
              <div>Price: ${i.price[0].toLocaleString()} → ${i.price[1].toLocaleString()}</div>
              <div>Quantity: {i.qty}</div>
              <div>Notional: ${i.notional[0].toLocaleString()} → ${i.notional[1].toLocaleString()}</div>
              <div>Holding time: {i.holding}</div>
            </div>
            <div className={`mt-1 text-sm font-semibold ${i.pnl>=0?"text-emerald-400":"text-rose-400"}`}>
              NET P&L: {i.pnl>=0?"+":"-"}${Math.abs(i.pnl).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

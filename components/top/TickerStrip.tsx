"use client"
import { useEffect, useState } from "react"

type T = { sym:string; price:number }
const SEEDS: T[] = [
  { sym:"BTC", price:114101.50 }, { sym:"ETH", price:4111.95 },
  { sym:"SOL", price:200.89 }, { sym:"BNB", price:1130.15 },
  { sym:"DOGE", price:0.2011 }, { sym:"XRP", price:2.65 },
]

export default function TickerStrip() {
  const [ticks, setTicks] = useState<T[]>(SEEDS)
  useEffect(()=>{
    const id = setInterval(()=> {
      setTicks(ts => ts.map(t => ({...t, price: +(t.price*(0.999+Math.random()*0.002)).toFixed(t.sym==="DOGE"?4:2)})))
    }, 1500)
    return ()=>clearInterval(id)
  },[])
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs border-y border-zinc-800 py-2">
      {ticks.map(t => (
        <div key={t.sym} className="flex items-center gap-1">
          <span className="font-semibold">{t.sym}</span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono">{t.price}</span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-4 text-[11px]">
        <span>HIGHEST: <b>DeepSeek Chat v3.1</b></span>
        <span>LOWEST: <b>GPT 5</b></span>
      </div>
    </div>
  )
}

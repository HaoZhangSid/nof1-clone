"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

type Leader = { rank: number; slug: string; name: string; retPct: number; delta: number }

export default function LeadersStrip() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  useEffect(() => {
    // 假数据
    setLeaders([
      { rank:1, slug:"gpt-5", name:"GPT-5", retPct: 12.4, delta: +1 },
      { rank:2, slug:"claude-sonnet-4-5", name:"Claude S4.5", retPct: 10.2, delta: -1 },
      { rank:3, slug:"gemini-2.5-pro", name:"Gemini 2.5 Pro", retPct: 8.9, delta: 0 },
    ])
  }, [])
  if (!leaders.length) return null
  return (
    <Card className="mt-6 p-3 bg-zinc-900/60 border-zinc-800/60 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3">
        {leaders.map(m => (
          <Link key={m.slug} href={`/models/${m.slug}`} className="inline-flex items-center gap-3 mr-2 px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition">
            <span className="text-xs px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-700">#{m.rank}</span>
            <span className="font-medium">{m.name}</span>
            <span className={`text-sm ${m.retPct>=0 ? "text-emerald-400" : "text-rose-400"}`}>{m.retPct.toFixed(2)}%</span>
            {m.delta > 0 ? <ArrowUpRight className="h-4 w-4 text-emerald-400"/> : m.delta < 0 ? <ArrowDownRight className="h-4 w-4 text-rose-400"/> : <span className="text-zinc-400 text-xs">=</span>}
          </Link>
        ))}
      </div>
    </Card>
  )
}

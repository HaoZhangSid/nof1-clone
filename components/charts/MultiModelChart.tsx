"use client"
import { useEffect, useMemo, useState } from "react"
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils/cn"

type Pt = { t:string; v:number }
type LineSet = { slug:string; name:string; color:string; series:Pt[]; last: Pt }

export default function MultiModelChart() {
  const [loading,setLoading] = useState(true)
  const [mode,setMode] = useState<"$"|"%">("$")
  const [range,setRange] = useState<"ALL"|"72H">("ALL")
  const [models,setModels] = useState<LineSet[]>([])
  const [benchmark,setBenchmark] = useState<Pt[]>([])

  async function load(m=mode, r=range) {
    setLoading(true)
    const res = await fetch(`/api/metrics/multi-account-value?mode=${m}&range=${r}`, { cache:"no-store" })
    const data = await res.json()
    setModels(data.models); setBenchmark(data.benchmark); setLoading(false)
  }
  useEffect(()=>{ load() }, [])

  const yFmt = (v:number)=> mode==="$" ? `$${Math.abs(v)>=1000? (v/1000).toFixed(1)+"k": v.toFixed(0)}` : `${v.toFixed(2)}%`
  const xFmt = (t:string)=> new Date(t).toLocaleString([], { month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit", hour12:false })

  return (
    <Card className="rounded-2xl bg-zinc-900/80 border-zinc-800/60">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base sm:text-lg tracking-wide">TOTAL ACCOUNT VALUE</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={mode==="$"?"secondary":"ghost"} onClick={()=>{setMode("$"); load("$", range)}}>$</Button>
          <Button size="sm" variant={mode==="%"?"secondary":"ghost"} onClick={()=>{setMode("%"); load("%", range)}}>%</Button>
          <div className="mx-1 h-4 w-px bg-zinc-700/60" />
          <Button size="sm" variant={range==="ALL"?"secondary":"ghost"} onClick={()=>{setRange("ALL"); load(mode,"ALL")}}>ALL</Button>
          <Button size="sm" variant={range==="72H"?"secondary":"ghost"} onClick={()=>{setRange("72H"); load(mode,"72H")}}>72H</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[420px] w-full rounded-xl" />
        ) : (
          <div className="relative h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart>
                <CartesianGrid strokeDasharray="4 4" stroke="#27272a" />
                <XAxis dataKey="t" type="category"
                  ticks={benchmark.map(p=>p.t).filter((_,i)=>i%Math.floor(benchmark.length/6||1)===0)}
                  tickFormatter={xFmt} stroke="#a1a1aa"/>
                <YAxis tickFormatter={yFmt} stroke="#a1a1aa"/>
                <Tooltip content={({active,payload,label})=>{
                  if(!active) return null
                  return (
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs">
                      <div className="text-zinc-400">{xFmt(label as string)}</div>
                      {payload?.map((p:any,i:number)=>(
                        <div key={i} className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full" style={{background:p.color}}/>
                          <span>{p.name}</span>
                          <b className="ml-auto">{yFmt(p.value)}</b>
                        </div>
                      ))}
                    </div>
                  )
                }}/>
                {/* 基准虚线 */}
                <Line type="monotone" data={benchmark} dataKey="v" stroke="#94a3b8" dot={false} strokeDasharray="6 6" />
                {/* 各模型线 */}
                {models.map(m=>(
                  <Line key={m.slug} type="monotone" data={m.series} dataKey="v" stroke={m.color} dot={false} strokeWidth={2} name={m.name}/>
                ))}
              </AreaChart>
            </ResponsiveContainer>

            {/* 右侧末端标签气泡 */}
            <div className="pointer-events-none absolute inset-0">
              {models.map((m,idx)=>{
                const last = m.series[m.series.length-1]
                if(!last) return null
                // 简易：按最后一个点在容器内的相对位置用 CSS approx（无需精确像素）
                const topPct = (idx+1)/(models.length+1)*80 + 10
                return (
                  <div key={m.slug} className="absolute right-2 translate-y-[-50%]">
                    <div className="relative" style={{ top:`${topPct}%` }}>
                      <span className="rounded px-2 py-1 text-[11px] font-semibold"
                            style={{ background:"rgba(24,24,27,.9)", border:"1px solid #27272a", color:m.color }}>
                        {mode==="$" ? `$${(m.last.v).toLocaleString()}` : `${m.last.v.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

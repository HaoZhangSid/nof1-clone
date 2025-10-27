"use client"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Line } from "recharts"
import { useEffect } from "react"
import { useAccountValueStore } from "@/lib/stores/accountValue"
import { fmtCurrency } from "@/lib/utils/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ranges: Array<"1d"|"7d"|"30d"|"all"> = ["1d","7d","30d","all"]

export default function AccountValueChart() {
  const { range, series, benchmark, currency, loading, setRange, fetchData } = useAccountValueStore()
  useEffect(() => { fetchData(range) }, []) // 初次加载
  return (
    <Card className="rounded-2xl bg-zinc-900/80 border-zinc-800/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg sm:text-xl">Total Account Value</CardTitle>
        <div className="flex items-center gap-2">
          {ranges.map(r => (
            <Button key={r} size="sm" variant={r===range ? "secondary" : "ghost"} onClick={() => setRange(r)}>
              {r.toUpperCase()}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => fetchData(range)}>Refresh</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[320px] sm:h-[380px] lg:h-[420px]">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : series.length === 0 ? (
          <div className="h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center text-zinc-400">
            No data yet — syncing...
          </div>
        ) : (
          <div className="h-[320px] sm:h-[380px] lg:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="fillMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#27272a"/>
                <XAxis dataKey="t" tickFormatter={(t) => new Date(t).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})} stroke="#a1a1aa"/>
                <YAxis tickFormatter={(v) => fmtCurrency(v, currency)} stroke="#a1a1aa"/>
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  const v = payload[0].value as number
                  return (
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs">
                      <div className="text-zinc-400">{new Date(label).toLocaleString()}</div>
                      <div className="font-medium">{fmtCurrency(v, currency)}</div>
                    </div>
                  )
                }} />
                <Area type="monotone" dataKey="v" stroke="#a78bfa" fill="url(#fillMain)" strokeWidth={2}/>
                <Line type="monotone" data={benchmark} dataKey="v" stroke="#64748b" dot={false} strokeDasharray="6 6"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

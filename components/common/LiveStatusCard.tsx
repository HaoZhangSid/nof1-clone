"use client"
import { useEffect } from "react"
import { useLiveStore } from "@/lib/stores/live"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

export default function LiveStatusCard() {
  const { status, round, nextUpdateSec, serverTime, lastUpdated, hydrate, tick, setStatus } = useLiveStore()
  useEffect(() => { hydrate(); const id = setInterval(tick, 1000); return () => clearInterval(id) }, [])

  const color = status === "live" ? "bg-emerald-500" : status === "syncing" ? "bg-amber-500" : "bg-rose-500"

  return (
    <Card className="rounded-2xl bg-zinc-900/80 border-zinc-800/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Status</CardTitle>
        {status === "disconnected" && (
          <Button size="sm" variant="destructive" onClick={() => setStatus("syncing")}>Reconnect</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
          <span className="font-medium uppercase">{status}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-zinc-400">Current Round</div>
            <div className="text-xl font-semibold">{round}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-zinc-400">Next Update</div>
            <div className="text-xl font-semibold">00:00:{String(nextUpdateSec).padStart(2, "0")}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-zinc-400">Server Time</div>
            <div className="font-mono">{new Date(serverTime).toLocaleTimeString([], { hour12:false })}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-zinc-400">Last Updated</div>
            <div className="font-mono">{new Date(lastUpdated).toLocaleTimeString([], { hour12:false })}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

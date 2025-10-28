// lib/stores/live.ts
import { create } from "zustand"

type Status = "live" | "syncing" | "disconnected"
type LiveState = {
  status: Status
  round: number | null
  nextUpdateSec: number | null
  serverTime: string | null
  lastUpdated: string | null
  tick: () => void
  hydrate: () => Promise<void>
  setStatus: (s: Status) => void
}

export const useLiveStore = create<LiveState>((set, get) => ({
  // 👇 SSR 首屏不要注入“当前时间”，用稳定的空值
  status: "syncing",
  round: null,
  nextUpdateSec: null,
  serverTime: null,
  lastUpdated: null,

  tick: () => {
    const s = get()
    if (s.nextUpdateSec == null) return
    const v = Math.max(0, s.nextUpdateSec - 1)
    set({ nextUpdateSec: v, serverTime: new Date().toISOString() })
    if (v === 0) set({ nextUpdateSec: 10, lastUpdated: new Date().toISOString() })
  },

  hydrate: async () => {
    // 挂载后才去拿“实时快照”
    await new Promise(r => setTimeout(r, 200))
    set({
      status: "live",
      round: 42,
      nextUpdateSec: 10,
      serverTime: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    })
  },

  setStatus: (s) => set({ status: s }),
}))

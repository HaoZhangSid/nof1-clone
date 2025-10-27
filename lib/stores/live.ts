import { create } from "zustand"

type Status = "live" | "syncing" | "disconnected"
type LiveState = {
  status: Status
  round: number
  nextUpdateSec: number
  serverTime: string
  lastUpdated: string
  tick: () => void
  hydrate: () => Promise<void>
  setStatus: (s: Status) => void
}

export const useLiveStore = create<LiveState>((set, get) => ({
  status: "live",
  round: 42,
  nextUpdateSec: 8,
  serverTime: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  tick: () => {
    const s = get()
    const v = Math.max(0, s.nextUpdateSec - 1)
    set({ nextUpdateSec: v, serverTime: new Date().toISOString() })
    if (v === 0) set({ nextUpdateSec: 10, lastUpdated: new Date().toISOString() })
  },
  hydrate: async () => {
    // 模拟请求
    await new Promise(r => setTimeout(r, 200))
    set({ status: "live", round: 42, nextUpdateSec: 8, lastUpdated: new Date().toISOString() })
  },
  setStatus: (s) => set({ status: s })
}))

import { create } from "zustand"

export type Pt = { t: string; v: number }
type Range = "1d" | "7d" | "30d" | "all"

type AVState = {
  range: Range
  currency: string
  series: Pt[]
  benchmark: Pt[]
  loading: boolean
  error?: string
  setRange: (r: Range) => void
  fetchData: (r?: Range) => Promise<void>
  applyDelta: (pt: Pt) => void
}

const makeSeries = (n = 120, base = 1_000_000) => {
  const out: Pt[] = []
  let cur = base
  for (let i = 0; i < n; i++) {
    cur += (Math.random() - 0.45) * 5_000
    out.push({ t: new Date(Date.now() - (n - i) * 60_000).toISOString(), v: cur })
  }
  return out
}

export const useAccountValueStore = create<AVState>((set, get) => ({
  range: "7d",
  currency: "USD",
  series: [],
  benchmark: [],
  loading: true,
  setRange: (r) => { set({ range: r }); get().fetchData(r) },
  fetchData: async (r) => {
    set({ loading: true, error: undefined })
    await new Promise(r => setTimeout(r, 300))
    const series = makeSeries(240)
    const benchmark = makeSeries(240, 995_000)
    set({ series, benchmark, loading: false })
  },
  applyDelta: (pt) => set(s => ({ series: [...s.series, pt] }))
}))

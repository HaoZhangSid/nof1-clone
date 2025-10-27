import { create } from "zustand"
export type Trade = {
  t: string; model: string; slug: string; sym: string; side: "Buy" | "Sell";
  qty: number; px: number; pnl: number; txn: string
}
type State = {
  items: Trade[]; loading: boolean; cursor?: string; error?: string
  fetchNext: () => Promise<void>
}
const seeds: Trade[] = Array.from({ length: 24 }).map((_, i) => ({
  t: new Date(Date.now() - i*60_000).toISOString(),
  model: "GPT-5", slug: "gpt-5", sym: i%2 ? "NVDA" : "BTC-USD",
  side: i%3 ? "Buy" : "Sell", qty: 100 + i, px: 120 + Math.random() * 12,
  pnl: (Math.random() - 0.5) * 300, txn: `0x${(Math.random()*1e16|0).toString(16)}`
}))
export const useTradesStore = create<State>((set, get) => ({
  items: [], loading: false,
  async fetchNext() {
    if (get().loading) return
    set({ loading: true })
    await new Promise(r => setTimeout(r, 300))
    set(s => ({ items: s.items.length ? [...s.items, ...seeds] : seeds, loading: false }))
  }
}))

import { create } from "zustand"
export type Position = {
  sym: string; name: string; slug: string; model: string;
  qty: number; avgPx: number; lastPx: number; pnl: number; value: number; exposure: number; updated: string
}
type State = {
  items: Position[]; loading: boolean; error?: string
  fetchAll: () => Promise<void>
}
const seeds: Position[] = [
  { sym:"NVDA", name:"NVIDIA", slug:"gpt-5", model:"GPT-5", qty:100, avgPx:120.12, lastPx:128.45, pnl:833, value:12845, exposure:0.12, updated:new Date().toISOString() },
  { sym:"BTC-USD", name:"Bitcoin", slug:"gpt-5", model:"GPT-5", qty:0.5, avgPx:64000, lastPx:66880, pnl:1440, value:33440, exposure:0.33, updated:new Date().toISOString() },
]
export const usePositionsStore = create<State>((set) => ({
  items: [], loading: false,
  async fetchAll() {
    set({ loading: true }); await new Promise(r => setTimeout(r, 300))
    set({ items: seeds, loading: false })
  }
}))

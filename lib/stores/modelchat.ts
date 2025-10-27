import { create } from "zustand"
export type ChatMsg = { id: string; t: string; role: "model"|"system"|"human"; model?: string; content: string; important?: boolean }
type State = {
  items: ChatMsg[]; loading: boolean; cursor?: string; error?: string
  fetch: () => Promise<void>
  append: (m: ChatMsg) => void
}
const seeds: ChatMsg[] = [
  { id:"m1", t:new Date().toISOString(), role:"model", model:"GPT-5", content:"Evaluating NVDA momentum and macro context...", important:true },
  { id:"m2", t:new Date().toISOString(), role:"system", content:"Risk cap per trade is 2% of NAV." },
  { id:"m3", t:new Date().toISOString(), role:"human", content:"Confirm rationale for BTC long add-on?" },
]
export const useModelChatStore = create<State>((set, get) => ({
  items: [], loading: false,
  async fetch() {
    set({ loading: true }); await new Promise(r => setTimeout(r, 250))
    set({ items: seeds, loading: false })
  },
  append(m) { set({ items: [...get().items, m] }) }
}))

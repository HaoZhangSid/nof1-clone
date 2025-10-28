"use client"
import dynamic from "next/dynamic"
import TickerStrip from "@/components/top/TickerStrip"
import TradesFeed from "@/components/feed/TradesFeed"
import ModelLegend from "@/components/legend/ModelLegend"
// 图表与状态卡禁 SSR 更稳
const MultiModelChart = dynamic(()=>import("@/components/charts/MultiModelChart"), { ssr:false })
const LiveStatusCard = dynamic(()=>import("@/components/common/LiveStatusCard"), { ssr:false })

import CompletedTradesTable from "@/components/tabs/CompletedTradesTable"
import PositionsView from "@/components/tabs/PositionsView"
import ModelChat from "@/components/tabs/ModelChat"
import ReadmePane from "@/components/tabs/ReadmePane"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="space-y-4">
      {/* 顶部币价条 */}
      <TickerStrip />

      {/* 主图 + 右侧交易Feed + 状态卡 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-3">
          <MultiModelChart />
          <ModelLegend />
        </div>
        <div className="space-y-3">
          <LiveStatusCard />
          <TradesFeed />
        </div>
      </div>

      {/* 页面下半：Tabs (与截图一致的顺序) */}
      <Tabs defaultValue="trades" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold tracking-wide">ALL | 72H</div>
          <TabsList className="rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <TabsTrigger value="trades">COMPLETED TRADES</TabsTrigger>
            <TabsTrigger value="chat">MODELCHAT</TabsTrigger>
            <TabsTrigger value="positions">POSITIONS</TabsTrigger>
            <TabsTrigger value="readme">README.TXT</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="trades" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[320px]">
          {/* 你也可以在这里复用表格版；上面的右侧是“时间线版” */}
          <CompletedTradesTable />
        </TabsContent>
        <TabsContent value="chat" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[320px]">
          <ModelChat />
        </TabsContent>
        <TabsContent value="positions" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[320px]">
          <PositionsView />
        </TabsContent>
        <TabsContent value="readme" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[320px]">
          <ReadmePane />
        </TabsContent>
      </Tabs>
    </div>
  )
}

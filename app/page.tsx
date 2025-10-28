"use client"
import dynamic from "next/dynamic"
import TickerStrip from "@/components/top/TickerStrip"
import TradesFeed from "@/components/feed/TradesFeed"
import ModelLegend from "@/components/legend/ModelLegend"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompletedTradesTable from "@/components/tabs/CompletedTradesTable"
import PositionsView from "@/components/tabs/PositionsView"
import ModelChat from "@/components/tabs/ModelChat"
import ReadmePane from "@/components/tabs/ReadmePane"

// 图表/状态卡禁 SSR 更稳
const MultiModelChart = dynamic(()=>import("@/components/charts/MultiModelChart"), { ssr:false })
const LiveStatusCard = dynamic(()=>import("@/components/common/LiveStatusCard"), { ssr:false })

export default function Home() {
  return (
    <div className="space-y-4">
      {/* 顶部币价条 */}
      <TickerStrip />

      {/* 主区：左 2/3 图 + 右 360 固定列（≥xl），右侧吸顶 */}
      <div className="
        grid grid-cols-1 gap-4
        xl:grid-cols-[minmax(0,1fr)_360px]
      ">
        {/* 左列 */}
        <div className="space-y-3">
          {/* 主图（高度 560，标题居中，$/% 与 ALL/72H 分列两端） */}
          <MultiModelChart />
          {/* 模型图例条（整块在主图下） */}
          <ModelLegend />
        </div>

        {/* 右列（吸顶容器，高度 720，内部分上下布局） */}
        <div className="xl:sticky xl:top-16">
          <div className="h-[720px] flex flex-col gap-4">
            <div className="shrink-0">
              <LiveStatusCard />
            </div>
            <div className="min-h-0 flex-1">
              {/* Feed 内部自己滚动，不影响页面滚动 */}
              <TradesFeed />
            </div>
          </div>
        </div>
      </div>

      {/* 下半区 Tabs：左边 ALL | 72H ，右侧四个 Tab */}
      <div className="mt-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-0 sm:px-0">
          <div className="text-xs font-semibold tracking-wide">ALL | 72H</div>
          <Tabs defaultValue="trades" className="w-full">
            <div className="flex items-center justify-end">
              <TabsList className="rounded-xl">
                <TabsTrigger value="trades">COMPLETED TRADES</TabsTrigger>
                <TabsTrigger value="chat">MODELCHAT</TabsTrigger>
                <TabsTrigger value="positions">POSITIONS</TabsTrigger>
                <TabsTrigger value="readme">README.TXT</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trades" className="min-h-[320px]">
              <CompletedTradesTable />
            </TabsContent>
            <TabsContent value="chat" className="min-h-[320px]">
              <ModelChat />
            </TabsContent>
            <TabsContent value="positions" className="min-h-[320px]">
              <PositionsView />
            </TabsContent>
            <TabsContent value="readme" className="min-h-[320px]">
              <ReadmePane />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

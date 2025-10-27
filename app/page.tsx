"use client"
import AccountValueChart from "@/components/charts/AccountValueChart"
import LiveStatusCard from "@/components/common/LiveStatusCard"
import LeadersStrip from "@/components/leaderboard/LeadersStrip"
import CompletedTradesTable from "@/components/tabs/CompletedTradesTable"
import PositionsView from "@/components/tabs/PositionsView"
import ModelChat from "@/components/tabs/ModelChat"
import ReadmePane from "@/components/tabs/ReadmePane"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 主区：图表 + 状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><AccountValueChart/></div>
        <div><LiveStatusCard/></div>
      </div>

      {/* 领先模型 */}
      <LeadersStrip />

      {/* Tabs */}
      <Tabs defaultValue="trades" className="space-y-3">
        <TabsList className="rounded-xl bg-zinc-900/60 border border-zinc-800/60">
          <TabsTrigger value="trades">Completed Trades</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="chat">ModelChat</TabsTrigger>
          <TabsTrigger value="readme">README.txt</TabsTrigger>
        </TabsList>
        <TabsContent value="trades" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[360px]">
          <CompletedTradesTable />
        </TabsContent>
        <TabsContent value="positions" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[360px]">
          <PositionsView />
        </TabsContent>
        <TabsContent value="chat" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[360px]">
          <ModelChat />
        </TabsContent>
        <TabsContent value="readme" className="rounded-2xl bg-zinc-900/70 p-3 sm:p-4 border border-zinc-800/60 min-h-[360px]">
          <ReadmePane />
        </TabsContent>
      </Tabs>
    </div>
  )
}

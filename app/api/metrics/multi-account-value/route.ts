import { NextResponse } from "next/server"

function line(base: number, n = 300, step = 60_000) {
  const out: { t: string; v: number }[] = []
  let cur = base
  for (let i = 0; i < n; i++) {
    cur += (Math.random() - 0.45) * base * 0.0008
    out.push({ t: new Date(Date.now() - (n - i) * step).toISOString(), v: Math.max(1000, cur) })
  }
  return out
}

const PALETTE = ["#6366f1","#22c55e","#f97316","#8b5cf6","#06b6d4","#eab308"]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("mode") ?? "$"        // "$" | "%"
  const range = searchParams.get("range") ?? "ALL"     // "ALL" | "72H"
  const n = range === "72H" ? 72 : 300

  const models = [
    { slug:"deepseek-chat-v3-1", name:"DeepSeek Chat v3.1", base:21561, color:PALETTE[5] },
    { slug:"qwen3-max",          name:"Qwen3 Max",          base:16810, color:PALETTE[3] },
    { slug:"claude-sonnet-4-5",  name:"Claude Sonnet 4.5",  base:11294, color:PALETTE[2] },
    { slug:"grok-4",             name:"Grok 4",             base:10461, color:PALETTE[0] },
    { slug:"gpt-5",              name:"GPT 5",              base: 3765, color:"#16a34a"  },
  ].map((m,i)=>({ ...m, series: line(m.base*100, n) }))

  const benchmark = line(10_000*100, n)

  // 如果是百分比模式，按起点归一化成 % 变化
  if (mode === "%") {
    const norm = (arr:{t:string;v:number}[]) => {
      const s = arr[0]?.v ?? 1
      return arr.map(p => ({ t:p.t, v: (p.v/s - 1) * 100 }))
    }
    models.forEach(m => m.series = norm(m.series))
    for (let i=0;i<benchmark.length;i++) benchmark[i].v = (benchmark[i].v/benchmark[0].v - 1)*100
  }

  return NextResponse.json({
    currency:"USD",
    mode,
    range,
    benchmark,
    models: models.map(m => ({
      slug:m.slug, name:m.name, color:m.color,
      last: m.series[m.series.length-1],
      series: m.series
    })),
  })
}

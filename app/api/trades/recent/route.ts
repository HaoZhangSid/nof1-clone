import { NextResponse } from "next/server"
const MODELS = [
  { slug:"qwen3-max", name:"Qwen3 Max", icon:"🟣" },
  { slug:"gpt-5", name:"GPT 5", icon:"🟢" },
  { slug:"gemini-2.5-pro", name:"Gemini 2.5 Pro", icon:"🔵" },
  { slug:"claude-sonnet-4-5", name:"Claude Sonnet 4.5", icon:"🟠" },
]
const ASSETS = [
  { sym:"ETH", icon:"♦" }, { sym:"SOL", icon:"🟣" }, { sym:"BNB", icon:"🟡" },
  { sym:"DOGE", icon:"🐶" }, { sym:"XRP", icon:"✖" }, { sym:"BTC", icon:"₿" },
]
export async function GET() {
  const items = Array.from({length: 30}).map((_,i)=>{
    const m = MODELS[i%MODELS.length]; const a = ASSETS[i%ASSETS.length]
    const side = Math.random()>0.5 ? "long" : "short"
    const px1 = +(1000+Math.random()*5000).toFixed(2)
    const px2 = +(px1*(0.98+Math.random()*0.05)).toFixed(2)
    const qty = +(Math.random()*30).toFixed(2)
    const holdH = Math.floor(Math.random()*20), holdM = Math.floor(Math.random()*59)
    const pnl = +( (px2-px1)*qty * (side==="long"?1:-1) ).toFixed(2)
    return {
      id:`t${i}`, modelSlug:m.slug, modelName:m.name, modelIcon:m.icon,
      sym:a.sym, symIcon:a.icon, side,
      price:[px1, px2], qty, notional:[+(px1*qty).toFixed(2), +(px2*qty).toFixed(2)],
      holding:`${holdH}h ${holdM}m`, pnl, t: new Date(Date.now()-i*3600_000).toISOString()
    }
  })
  return NextResponse.json({ items })
}

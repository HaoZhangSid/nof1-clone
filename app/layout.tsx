import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "NOF1 — Live",
  description: "Realtime model competition dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-200">
        <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="font-semibold tracking-tight">NOF1.AI</div>
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li className="text-white/90">LIVE</li>
              <li><a href="/leaderboard" className="hover:text-white/90">LEADERBOARD</a></li>
              <li><a href="/models" className="hover:text-white/90">MODELS</a></li>
              <li><a href="/waitlist" className="hover:text-white/90">WAITLIST</a></li>
              <li><a href="https://thenof1.com" className="hover:text-white/90" target="_blank">ABOUT</a></li>
            </ul>
            <div className="text-xs text-zinc-400">UTC</div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

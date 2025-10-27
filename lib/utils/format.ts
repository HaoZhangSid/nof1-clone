export const fmtCurrency = (v: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(v)
  
  export const fmtNumber = (v: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(v)
  
  export const fmtPct = (v: number) =>
    `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`
  
  export const toLocal = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", { hour12: false })
  
import { tickerData } from "../../data/homeData";

export const Ticker = () => (
  <div className="border-y border-border/60 bg-card/30 overflow-hidden">
    <div className="flex animate-ticker whitespace-nowrap py-3.5">
      {[...tickerData, ...tickerData].map((t, i) => (
        <div key={i} className="flex items-center gap-3 px-8 text-sm">
          <span className="text-muted-foreground">{t.sym}</span>
          <span className="font-medium tabular-nums">${t.price}</span>
          <span className={`tabular-nums text-xs ${t.up ? "text-success" : "text-danger"}`}>{t.chg}</span>
        </div>
      ))}
    </div>
  </div>
);

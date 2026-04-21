import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section } from "../ui/SectionHeader";

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
    <span className="text-muted-foreground">{label}</span>
  </div>
);

export const PerformanceBand = () => {
  const data = Array.from({ length: 30 }, (_, i) => ({
    d: i,
    portfolio: 100 + i * 0.9 + Math.sin(i * 0.5) * 3,
    benchmark: 100 + i * 0.3 + Math.sin(i * 0.4) * 1.5,
  }));

  return (
    <Section className="bg-card/20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary-glow font-semibold">Verified results</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Performance you can <span className="text-gradient-primary">audit.</span>
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Every strategy publishes its full live trade history. Compare against benchmarks, inspect
            individual fills, and verify Sharpe and Sortino ratios — no marketing math.
          </p>
          <div className="grid grid-cols-2 gap-5 mt-8 max-w-md">
            {[
              { k: "+187%", v: "Avg. annual return", sub: "Top quartile · 2023" },
              { k: "0.42", v: "Beta to BTC", sub: "Lower correlation" },
              { k: "<6%", v: "Max drawdown", sub: "Risk-controlled" },
              { k: "100%", v: "Verified trades", sub: "On-chain logged" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold tabular-nums text-gradient-primary">{s.k}</div>
                <div className="text-sm font-medium mt-1">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 shadow-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">CyrionTrade Index vs BTC</p>
              <p className="text-xs text-muted-foreground">Last 30 days · Live</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <Legend color="hsl(var(--muted-foreground))" label="BTC" />
              <Legend color="hsl(var(--primary-glow))" label="CyrionTrade" />
            </div>
          </div>
          <div className="h-72 min-w-0">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="portfolio" stroke="hsl(var(--primary-glow))" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Section>
  );
};

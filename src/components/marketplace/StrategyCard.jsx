import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { sparkData } from "@/data/marketplaceData";

export const StrategyCard = ({ s, idx }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="group surface hover:border-primary/40 hover:shadow-elevated transition-all duration-300 flex flex-col"
  >
    <Link to={`/marketplace/${s.id}`} className="p-6 flex-1 flex flex-col focus:outline-none">
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{s.name}</h3>
            {s.badge && (
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold",
                  s.badge === "Premium" && "bg-accent/15 text-accent",
                  s.badge === "New" && "bg-success/15 text-success",
                  s.badge === "Popular" && "bg-primary/15 text-primary",
                )}
              >
                {s.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{s.pair} · {s.category}</p>
        </div>
        <div className="text-right shrink-0">
          <div className={cn("text-lg font-bold tabular-nums", s.perf >= 0 ? "text-success" : "text-danger")}>
            {s.perf >= 0 ? "+" : ""}{s.perf}%
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">30d return</div>
        </div>
      </div>

      <div className="h-16 -mx-2 mb-4 min-w-0">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <LineChart data={sparkData(idx + 1)}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={s.perf >= 0 ? "hsl(var(--success))" : "hsl(var(--danger))"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 pb-4 border-b border-border/60 text-xs">
        <Stat label="Risk" value={s.risk} />
        <Stat label="Sharpe" value={(s.sharpe || 0).toFixed(2)} />
        <Stat label="Trades" value={(s.trades || 0).toLocaleString()} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 flex-1">
        {s.exchanges.map((e) => (
          <span key={e} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{e}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-xl font-bold tabular-nums">${s.price}</span>
          <span className="text-xs text-muted-foreground">/mo</span>
        </div>
        <div className="group-hover:text-primary-glow inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
          View details
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const Stat = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
    <div className="font-medium tabular-nums">{value}</div>
  </div>
);

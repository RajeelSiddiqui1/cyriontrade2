import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { fadeUp, Section, SectionHeader } from "../ui/SectionHeader";
import { strategies, sparkData } from "../../data/homeData";

const Stat = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</div>
    <div className="font-medium tabular-nums">{value}</div>
  </div>
);

export const Strategies = () => (
  <Section id="strategies">
    <SectionHeader
      eyebrow="Marketplace"
      title="Strategies built by professional traders."
      desc="Every strategy ships with verified historical performance, live tracking and a 14-day money-back window."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {strategies.map((s, i) => (
        <motion.div
          key={s.name}
          variants={fadeUp}
          className="group relative glass rounded-2xl p-6 hover:border-primary/40 hover:shadow-elevated transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold">{s.name}</h3>
                {s.badge && (
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold ${
                    s.badge === "Premium" ? "bg-accent/15 text-accent" :
                    s.badge === "New" ? "bg-success/15 text-success" :
                    "bg-primary/15 text-primary-glow"
                  }`}>
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{s.pair}</p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold tabular-nums ${s.perf >= 0 ? "text-success" : "text-danger"}`}>
                {s.perf >= 0 ? "+" : ""}{s.perf}%
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">30d return</div>
            </div>
          </div>

          {/* Sparkline */}
          <div className="h-16 -mx-2 mb-4 min-w-0">
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <LineChart data={sparkData(i + 1)}>
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

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xl font-bold tabular-nums">${s.price}</span>
              <span className="text-xs text-muted-foreground">/mo</span>
            </div>
            <button className="group/btn inline-flex items-center gap-1.5 text-sm font-medium text-primary-glow hover:gap-2.5 transition-all">
              View details
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

import { motion } from "framer-motion";
import { TrendingUp, Activity, Zap, BarChart3 } from "lucide-react";
import { topStatsData } from "@/data/topStatsData";
import { cn } from "@/lib/utils";

export const TopStats = () => {
  const { performers, bots } = topStatsData;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Top Performers Column */}
          <motion.div {...fadeIn} className="space-y-10">
            <div className="text-center md:text-left">
              <span className="text-primary uppercase tracking-[0.4em] font-black text-[10px] mb-4 block">Market Pulse</span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-foreground flex items-center justify-center md:justify-start gap-4">
                Top Performers (24h)
              </h3>
              <div className="w-12 h-1 bg-primary/20 mt-6 hidden md:block" />
            </div>

            
            <div className="glass-strong rounded-[2.5rem] border border-border/50 p-6 md:p-8 space-y-4">
              {performers.map((item, i) => (
                <div 
                  key={item.pair}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-secondary/20 hover:bg-primary/[0.05] border border-transparent hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <span className="font-black text-foreground text-sm tracking-tight">{item.pair}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Vol: {item.vol}</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="font-black text-foreground tabular-nums text-sm">{item.price}</span>
                    <span className="text-xs font-bold text-success tabular-nums">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Bots Column */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-10">
            <div className="text-center md:text-left">
              <span className="text-primary uppercase tracking-[0.4em] font-black text-[10px] mb-4 block">Automation Leaders</span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-foreground flex items-center justify-center md:justify-start gap-4">
                Top Trading Bots
              </h3>
              <div className="w-12 h-1 bg-primary/20 mt-6 hidden md:block" />
            </div>

            
            <div className="glass-strong rounded-[2.5rem] border border-border/50 p-6 md:p-8 space-y-4 relative overflow-hidden group/container">
               {/* Animated subtle glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] group-hover/container:bg-primary/20 transition-all duration-700" />
              
              {bots.map((bot, i) => (
                <div 
                  key={bot.name}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-secondary/20 hover:bg-primary/[0.05] border border-transparent hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="mb-3 md:mb-0">
                    <div className="font-black text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">{bot.name}</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">{bot.trades} trades executed</div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10">
                    <div className="text-right">
                      <div className="text-sm font-black text-foreground tabular-nums">{bot.profit}</div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/40">Total Profit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-success tabular-nums">{bot.winRate}</div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/40">Win Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

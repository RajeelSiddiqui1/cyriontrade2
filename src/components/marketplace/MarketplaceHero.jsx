import { motion } from "framer-motion";
import { Search, ShieldCheck, SlidersHorizontal, ArrowRight } from "lucide-react";

export const MarketplaceHero = ({ strategyCount }) => (
  <section className="relative pt-40 md:pt-48 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />
    
    <div className="container max-w-7xl relative mx-auto px-4 z-10">
      <div className="max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-primary uppercase tracking-[0.4em] font-black text-xs md:text-sm mb-6 block">Premium Algorithms</span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mt-3 text-foreground leading-[1.1]">
            Institutional Grade <br />
            <span className="text-gradient-primary">Trading Marketplace.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Browse {strategyCount}+ verified trading strategies, signals, and copy bots. Filter by risk, pair, and performance — then understand exactly what's under the hood before you trade.
          </p>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-12 flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60"
      >
        {[
          { icon: Search, text: "Advanced Filtering" },
          { icon: ShieldCheck, text: "Verified Track Records" },
          { icon: SlidersHorizontal, text: "Full Execution Logic" },
        ].map((s) => (
          <div key={s.text} className="flex items-center gap-3">
            <s.icon className="w-4 h-4 text-primary" />
            <span>{s.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);


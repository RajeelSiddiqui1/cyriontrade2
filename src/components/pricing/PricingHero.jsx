import { cn } from "@/lib/utils";
import { header } from "@/data/pricingData";
import { motion } from "framer-motion";

export const PricingHero = ({ yearly, setYearly }) => (
  <section className="relative pt-40 md:pt-48 pb-12 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />
    
    <div className="container max-w-7xl relative text-center mx-auto px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-primary uppercase tracking-[0.4em] font-black text-xs md:text-sm mb-6 block">Pricing Plans</span>
        <h1 className="text-4xl md:text-7xl font-black tracking-tight mt-3 text-foreground leading-[1.1]">
          {header.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
          {header.subtitle}
        </p>

        {/* Billing toggle */}
        <div className="mt-12 inline-flex items-center gap-1 glass-strong p-1.5 rounded-2xl text-sm shadow-xl border-border/50">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all",
              !yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all inline-flex items-center gap-2 relative",
              yearly ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Annually
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[8px] font-black leading-none transition-colors",
              yearly 
                ? "bg-primary-foreground text-primary" 
                : "bg-primary/20 text-primary"
            )}>
              SAVE 20%
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);


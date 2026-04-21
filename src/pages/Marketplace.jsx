import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceSidebar } from "@/components/marketplace/MarketplaceSidebar";
import { MarketplaceCard } from "@/components/marketplace/MarketplaceCard";
import { MARKETPLACE_ITEMS } from "@/data/marketplace/marketplaceData";

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState("Strategies");

  const items = useMemo(() => {
    return MARKETPLACE_ITEMS[activeCategory] || [];
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <MarketplaceHero strategyCount={items.length} />

      <section className="pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <MarketplaceSidebar 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            </div>

            {/* Grid Area */}
            <div className="lg:col-span-9 space-y-12">
              <div className="flex items-end justify-between border-b border-border/20 pb-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">{activeCategory}</h2>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{items.length} Available</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <MarketplaceCard 
                      key={item.title} 
                      item={item} 
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Trading CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-primary shadow-glow">
        {/* Decorative elements for premium feel */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-white/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container max-w-7xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-primary-foreground uppercase leading-[0.9]">
            Start trading with <br className="hidden md:block" /> CyrionTrade for free!
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto">
            Free to use — no credit card required. <br /> Experience institutional tools today.
          </p>
          <button className="bg-foreground text-background px-14 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform shadow-2xl">
            Start Now
          </button>
        </motion.div>
      </section>



      <SiteFooter />
    </main>
  );
};

export default Marketplace;


import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MARKETPLACE_CATEGORIES } from "@/data/marketplace/marketplaceData";

export const MarketplaceSidebar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="glass-strong rounded-[2.5rem] p-8 border border-border/50 h-fit sticky top-24">
      <h2 className="text-2xl font-black tracking-tight text-foreground mb-10">Marketplace</h2>
      
      <div className="space-y-4">
        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60 mb-6 block">Categories</span>
        
        {MARKETPLACE_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 font-bold text-sm",
              activeCategory === cat.name
                ? "bg-primary text-primary-foreground shadow-glow"
                : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{cat.name}</span>
            <span className={cn(
              "px-2.5 py-0.5 rounded-lg text-[10px] font-black",
              activeCategory === cat.name ? "bg-primary-foreground/20" : "bg-card/50"
            )}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

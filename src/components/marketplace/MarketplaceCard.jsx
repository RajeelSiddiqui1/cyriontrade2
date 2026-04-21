import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const MarketplaceCard = forwardRef(({ item, onClick }, ref) => {
  // Slug should match the detail page generation
  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <Link to={`/marketplace/${slug}`} className="block">
        <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        className="glass-strong rounded-[2.5rem] overflow-hidden border border-border/50 group cursor-pointer transition-all duration-500 hover:shadow-glow hover:border-primary/50"
        >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-secondary/20 to-background flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent_70%)]" />
            <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-110 drop-shadow-2xl" 
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>

        <div className="p-8 space-y-4 relative">
            <div className="flex items-center justify-between">
                {item.badge ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.2em] text-primary">
                    {item.badge}
                </span>
                ) : <div/>}
                <div className="text-lg group-hover:scale-125 transition-transform duration-500">
                    {item.emoji}
                </div>
            </div>
            
            <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[3rem]">
            {item.title}
            </h3>

            <div className="flex items-center justify-between pt-4 border-t border-border/10">
            <div className="flex items-center gap-2 text-muted-foreground/40 italic">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.users} Users</span>
            </div>
            <div className="text-xl font-black text-primary tabular-nums tracking-tighter">
                {item.price}
            </div>
            </div>
        </div>

        </motion.div>
    </Link>
  );
});

MarketplaceCard.displayName = "MarketplaceCard";


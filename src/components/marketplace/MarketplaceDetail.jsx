import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Star, ArrowLeft, Download, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { STRATEGY_DESCRIPTIONS } from "@/data/marketplace/strategyDescriptions";
import { SIGNAL_DESCRIPTIONS } from "@/data/marketplace/signalDescriptions";

export const MarketplaceDetail = ({ item, category, onClose }) => {
  if (!item) return null;

  const [activeTab, setActiveTab] = useState("Overview");

  // Robust slug generation
  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace all non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
  
  let description = null;
  if (category === "Strategies") description = STRATEGY_DESCRIPTIONS[slug] || STRATEGY_DESCRIPTIONS.default(item.title, category);
  if (category === "Signals") description = SIGNAL_DESCRIPTIONS[slug] || SIGNAL_DESCRIPTIONS.default(item.title, category);
  
  if (!description) description = STRATEGY_DESCRIPTIONS.default(item.title, category);

  const overview = typeof description === 'string' ? description : description.overview;
  const metrics = description.metrics || { frequency: 5, holdingTime: 3 }; // Defaults

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl overflow-y-auto"
    >
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            View all strategies
          </button>
          
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Sidebar - Summary Card */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-strong rounded-[2.5rem] border border-border/50 overflow-hidden shadow-2xl">
              <div className="p-8 text-center space-y-6">
                <h2 className="text-2xl font-black tracking-tight leading-tight">{item.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Type</div>
                    <div className="text-sm font-black text-primary">{category.slice(0, -1)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Rating</div>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-2.5 h-2.5 fill-current", i < item.rating ? "text-primary" : "text-muted-foreground/20")} />
                      ))}
                      <span className="text-[9px] font-black text-muted-foreground/50 ml-1">({item.reviews})</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab("Reviews")}
                      className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline mt-1"
                    >
                      Read full review
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/20">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Price</div>
                    <div className="text-4xl font-black text-primary tracking-tighter mb-8">{item.price}</div>
                    
                    <button className="w-full btn-primary py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                      Purchase Now
                    </button>
                    <p className="text-[10px] text-muted-foreground/50 mt-4 font-medium">Includes 1 month of updates and support</p>
                </div>

                <div className="pt-6 border-t border-border/20 flex flex-col items-center gap-2">
                   <div className="flex items-center gap-2 text-muted-foreground/80">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-black tabular-nums">{item.users} users</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Graphical Banner Header */}
            <div className="relative rounded-[3rem] overflow-hidden border border-border/50 shadow-glow aspect-[21/9] flex flex-col">
              <img src={item.banner || item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
              
              <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-between">
                <div className="grid md:grid-cols-2 gap-12 max-w-2xl">
                  {/* Frequency */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 flex justify-between">
                      <span>Frequency</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className={cn("h-4 w-2 rounded-sm transition-all duration-700", i < metrics.frequency ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "bg-white/10")} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase text-white/40 tracking-widest pt-1">
                      <span>Low</span>
                      <span>Avg</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Holding Time */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 flex justify-between">
                      <span>Holding Time</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full p-1 relative overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(metrics.holdingTime / 10) * 100}%` }}
                        className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                       />
                       <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                       </div>
                    </div>
                    <div className="flex justify-between text-[8px] font-black uppercase text-white/40 tracking-widest pt-1">
                      <span>Min</span>
                      <span>Hours</span>
                      <span>Days</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                  {item.title.split(" - ").pop()}
                </h1>
              </div>
            </div>

            {/* Tabs & Details */}
            <div className="space-y-8">
              <div className="flex gap-10 border-b border-border/20 pb-4">
                {["Overview", "Reviews"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "text-xs font-black uppercase tracking-[0.2em] relative transition-colors py-2",
                      activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              <div className="prose dark:prose-invert prose-p:text-muted-foreground/80 prose-p:leading-relaxed max-w-none">
                {activeTab === "Overview" ? (
                  <div className="space-y-12">
                    {/* Render overview with structured headings if it's long text */}
                    <div className="space-y-10 whitespace-pre-wrap font-medium text-lg leading-relaxed">
                       {overview.split("\n\n").map((chunk, idx) => {
                         const isHeading = /^[A-Z\s]{4,}$/.test(chunk.trim());
                         if (isHeading) return <h3 key={idx} className="text-xl font-black tracking-tight text-primary mt-12 mb-6 border-b border-primary/10 pb-4 uppercase">{chunk}</h3>;
                         return <p key={idx}>{chunk}</p>;
                       })}
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 py-20 bg-card/20 rounded-[3rem] border border-border/50">
                    <div className="text-4xl">⭐</div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-black">Community Reviews</h3>
                       <p className="text-muted-foreground max-w-xs mx-auto">No detailed reviews yet. Be the first to share your experience!</p>
                    </div>
                    <button className="btn-secondary px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Write a review</button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Footer inside page */}
        <div className="mt-32 pt-12 border-t border-border/20 text-[10px] space-y-4 font-medium text-center max-w-4xl mx-auto text-muted-foreground/50 italic leading-relaxed">
            <p>The products provided on this page are not provided by CyrionTrade, but by external advisers and trading professionals. Although we check and validate each marketplace seller, CyrionTrade will not be liable or responsible for any loss or damage due to the use of these templates, strategies, and signals.</p>
            <p>* All prices on this website are excluding VAT and excluding payment provider fees (if applicable).</p>
        </div>
      </div>
    </motion.div>
  );
};

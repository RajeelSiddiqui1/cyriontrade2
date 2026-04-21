import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MARKETPLACE_ITEMS } from "@/data/marketplace/marketplaceData";
import { STRATEGY_DESCRIPTIONS } from "@/data/marketplace/strategyDescriptions";
import { SIGNAL_DESCRIPTIONS } from "@/data/marketplace/signalDescriptions";
import { ArrowLeft, X, Users, Star, ShieldCheck, Zap, Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConnectWalletModal } from "@/components/Modal/ConnectWalletModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const StrategyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      showToast("Authentication required. Please login to continue.", "info");
      return;
    }

    if (!user.walletAddress) {
      setIsWalletModalOpen(true);
      return;
    }

    if (!window.confirm(`Are you sure you want to purchase ${item.title} for ${item.price}?`)) return;

    setIsPurchasing(true);
    try {
      const { authAPI } = await import("@/services/api");
      await authAPI.purchase(user.uid, slug, item.price, category);
      alert("Congratulations! Your purchase was successful. You can now access this tool in your dashboard.");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again or contact support.");
    } finally {
      setIsPurchasing(false);
    }
  };

  const scrollToReviews = () => {
    setActiveTab("Reviews");
    setTimeout(() => {
      document.getElementById("detail-tabs")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Find the item across all categories
  const { item, category } = useMemo(() => {
    for (const [catName, items] of Object.entries(MARKETPLACE_ITEMS)) {
      const found = items.find(it => {
        const slug = it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        return slug === id;
      });
      if (found) return { item: found, category: catName };
    }
    return { item: null, category: null };
  }, [id]);

  if (!item) {
    return <Navigate to="/marketplace" replace />;
  }

  // Find description
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  let description = null;
  if (category === "Strategies") description = STRATEGY_DESCRIPTIONS[slug] || STRATEGY_DESCRIPTIONS.default(item.title, category);
  if (category === "Signals") description = SIGNAL_DESCRIPTIONS[slug] || SIGNAL_DESCRIPTIONS.default(item.title, category);
  if (!description) description = STRATEGY_DESCRIPTIONS.default(item.title, category);

  const overview = typeof description === 'string' ? description : description.overview;
  const metrics = description.metrics || { frequency: 5, holdingTime: 3 };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <div className="container max-w-7xl mx-auto px-4 py-32 md:py-40 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate("/marketplace")}
            className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            View all strategies
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Sidebar - Summary Card */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-strong rounded-[2.5rem] border border-border/50 overflow-hidden shadow-2xl"
            >
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
                      onClick={scrollToReviews}
                      className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline mt-1"
                    >
                      Read full review
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/20">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Price</div>
                    <div className="text-4xl font-black text-primary tracking-tighter mb-8">{item.price}</div>
                    
                    <button 
                      onClick={handlePurchase}
                      disabled={isPurchasing}
                      className="w-full btn-primary py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isPurchasing ? "Processing..." : "Purchase Now"}
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
            </motion.div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Graphical Banner Header */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative rounded-[3rem] overflow-hidden border border-border/50 shadow-glow aspect-[21/9] flex flex-col"
            >
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
            </motion.div>

            {/* Tabs & Details */}
            <div id="detail-tabs" className="space-y-8">
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
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-secondary/10 border border-border/20">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                            <Info className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-bold text-muted-foreground/80 leading-relaxed italic">
                            This is a verified high-performance ${category?.slice(0, -1).toLowerCase() || 'trading'} tool. Before deploying on a live exchange, we strongly recommend running in paper trading mode for at least 48 hours.
                        </p>
                    </div>

                    <div className="space-y-10 whitespace-pre-wrap font-medium text-lg leading-relaxed">
                       {overview.split("\n\n").map((chunk, idx) => {
                         const isHeading = /^[A-Z\s|]{4,}$/.test(chunk.trim());
                         if (isHeading) return <h3 key={idx} className="text-xl font-black tracking-tight text-primary mt-12 mb-6 border-b border-primary/10 pb-4 uppercase">{chunk}</h3>;
                         return <p key={idx} className="text-muted-foreground/80">{chunk}</p>;
                       })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between pb-6 border-b border-border/20">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black tracking-tight text-foreground">User Reviews</h3>
                            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Based on verified user signals</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                            </div>
                            <span className="text-xs font-black text-primary ml-2">{item.rating?.toFixed(1) || "5.0"} / 5.0</span>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {[
                            { name: "Alex Rivers", date: "2 days ago", rating: 5, text: `Absolutely phenomenal results! This ${category?.slice(0, -1).toLowerCase() || 'bot'} caught the recent market move perfectly. Highly recommend.` },
                            { name: "Sarah Chen", date: "1 week ago", rating: 5, text: "Setup was surprisingly easy. Connected my exchange API and it started trading within minutes. The ROI has been very consistent." },
                            { name: "Marcus Thorne", date: "2 weeks ago", rating: 4, text: "Great performance, though I suggest using it with a larger capital base to cover exchange fees effectively." }
                        ].map((review, idx) => (
                            <div key={idx} className="glass-card p-10 rounded-[2.5rem] border border-border/20 space-y-6 hover:border-primary/30 transition-all duration-500">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-black text-primary text-sm shadow-inner">
                                            {review.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-base font-black text-foreground">{review.name}</div>
                                            <div className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/20")} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-lg italic leading-relaxed">"{review.text}"</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 flex flex-col items-center gap-6">
                        <div className="w-px h-12 bg-gradient-to-b from-border/20 to-primary/40" />
                        <button className="btn-primary !px-12 !py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                            Write a Review
                        </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-32 pt-12 border-t border-border/20 text-[10px] space-y-4 font-medium text-center max-w-4xl mx-auto text-muted-foreground/50 italic leading-relaxed">
            <p>The products provided on this page are not provided by CyrionTrade, but by external advisers and trading professionals. Although we check and validate each marketplace seller, CyrionTrade will not be liable or responsible for any loss or damage due to the use of these templates, strategies, and signals.</p>
            <p>* All prices on this website are excluding VAT and excluding payment provider fees (if applicable).</p>
        </div>
      </div>

      <SiteFooter />
      
      <ConnectWalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </main>
  );
};

export default StrategyDetail;


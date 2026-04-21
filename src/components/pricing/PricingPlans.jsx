import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { plans } from "@/data/pricingData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ConnectWalletModal } from "@/components/Modal/ConnectWalletModal";

export const PricingPlans = ({ yearly }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleCTAClick = (planName) => {
    if (!user) {
      showToast("Authentication required. Please login first to choose a plan.", "info");
      return;
    }

    if (!user.walletAddress) {
      setIsWalletModalOpen(true);
      return;
    }

    // Handle plan selection logic here if needed
    alert(`Selecting plan: ${planName}`);
  };

  return (
    <section className="pt-12 pb-24 overflow-visible">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, index) => {
            const currentPrice = yearly ? p.priceYearly : p.priceMonthly;
            
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative rounded-3xl p-8 flex flex-col transition-all duration-500 border border-border/50",
                  p.popular ? "glass-strong border-primary shadow-glow ring-1 ring-primary/20 scale-105 z-20" : "bg-card/40 hover:bg-card/60"
                )}
              >
                {p.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-glow z-30 whitespace-nowrap">
                    Most popular
                  </div>
                )}

                
                <div className="mb-8">
                  <h3 className="text-xl font-black tracking-tight text-foreground">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-primary text-2xl font-black">$</span>
                    <motion.span 
                      key={currentPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl font-black tracking-tight text-foreground tabular-nums"
                    >
                      {currentPrice}
                    </motion.span>
                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest ml-1">/mo</span>
                  </div>
                  {yearly && p.priceYearly !== "0" && (
                    <p className="text-[10px] text-primary font-bold uppercase tracking-tighter mt-1">
                      Billed annually (${parseInt(p.priceYearly) * 12}/yr)
                    </p>
                  )}
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4">{p.description}</p>
                </div>

                <ul className="space-y-4 flex-1 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleCTAClick(p.name)}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all",
                    p.popular ? "btn-primary" : "btn-outline"
                  )}
                >
                  {p.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs text-muted-foreground font-medium max-w-2xl mx-auto opacity-60">
            All prices on this website are exclusive VAT (if applicable). Free trial limited to 7 days for new accounts only.
            Start your journey with confidence.
          </p>
        </div>
      </div>

      <ConnectWalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </section>
  );
};


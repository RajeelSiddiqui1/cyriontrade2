import { Modal } from "./Modal";
import { Check, Shield, Zap, Gift } from "lucide-react";
import { useState, useEffect } from "react";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem("hideWelcomeModal");
    if (!hidden) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem("hideWelcomeModal", "true");
    }
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md">
      <div className="relative pt-32 pb-12 px-8 flex flex-col items-center text-center">
        {/* Decorative Top Banner */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
        <div className="absolute top-8 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="absolute top-12 flex flex-col items-center">
            <span className="text-primary text-6xl font-black tracking-tighter drop-shadow-glow">$99</span>
            <span className="text-foreground uppercase tracking-[0.3em] font-black text-[10px] mt-1">Welcome Bonus</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight text-foreground mb-4 mt-8">
            Start Trading Today!
        </h2>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-10 max-w-xs mx-auto">
            Join thousands of traders and unlock exclusive rewards. Get started with our premium platform and receive up to $99 in welcome bonuses.
        </p>

        <div className="w-full space-y-3 mb-10">
            {[
                { icon: Gift, text: "Instant $99 bonus on your first deposit" },
                { icon: Zap, text: "Access to advanced AI-powered trading bots" },
                { icon: Shield, text: "Bank-level security with 24/7 support" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-foreground/80">{item.text}</span>
                </div>
            ))}
        </div>

        <button 
            onClick={handleClose}
            className="w-full btn-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs mb-8"
        >
            Get Started Now
        </button>

        <label className="flex items-center justify-center gap-3 cursor-pointer group mb-4">
            <input 
                type="checkbox" 
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                className="hidden" 
            />
            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${dontShow ? 'bg-primary border-primary' : 'border-border/50 group-hover:border-primary/50'}`}>
                {dontShow && <Check className="w-3 h-3 text-primary-foreground stroke-[3px]" />}
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Don't show this again</span>
        </label>

        <p className="text-[10px] font-bold text-primary italic opacity-60">
            Limited time offer - Don't miss out!
        </p>
      </div>
    </Modal>
  );
};

import { ArrowRight, Shield } from "lucide-react";
import { Section } from "../ui/SectionHeader";

export const CTA = () => (
  <Section className="py-24">
    <div className="relative glass-strong rounded-[3rem] p-12 md:p-24 overflow-hidden text-center border border-border/50">
      <div className="absolute inset-0 bg-gradient-primary opacity-[0.08]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col items-center">
             <span className="text-primary uppercase tracking-[0.5em] font-black text-xs md:text-sm mb-6 block">Take the next step</span>
             <h2 className="text-5xl md:text-[7.5rem] font-black tracking-[calc(-0.04em)] leading-[0.8] text-foreground uppercase">
                Ready to Start <br className="hidden md:block" /> <span className="text-gradient-primary">Trading?</span>
             </h2>
        </div>
        
        <p className="text-muted-foreground mt-12 text-xl md:text-3xl font-bold leading-relaxed max-w-3xl mx-auto opacity-70 tracking-tight">
          Join thousands of traders who trust CyrionTrade for professional-grade market intelligence.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <a href="/marketplace" className="btn-primary !px-12 !py-5 !rounded-2xl !text-sm uppercase tracking-widest font-black group shadow-glow">
            Explore Strategies <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/pricing" className="btn-secondary !px-12 !py-5 !rounded-2xl !text-sm uppercase tracking-widest font-black">
            View Pricing
          </a>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-4 font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground/50">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Read-only API keys</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span>No withdrawal access</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  </Section>

);

import { useState } from "react";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/pricingData";

export const PricingFAQ = () => (
  <section className="py-24 bg-background">
    <div className="container max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-primary uppercase tracking-[0.4em] font-black text-xs mb-6 block">FAQ</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Frequently asked questions.</h2>
        <div className="w-16 h-1 bg-primary/30 mx-auto mt-6" />
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  </section>
);


const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-6 hover:bg-secondary/10"
      >
        <span className="font-medium text-lg">{q}</span>
        <span className={cn(
          "w-8 h-8 grid place-items-center rounded-full bg-secondary text-muted-foreground transition-transform duration-300 shrink-0", 
          open && "rotate-45 bg-primary/10 text-primary"
        )}>
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2">{a}</div>
      )}
    </div>
  );
};

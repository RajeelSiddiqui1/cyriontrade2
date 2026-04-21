import { ArrowRight } from "lucide-react";

export const PricingCTA = () => (
  <section className="pb-24">
    <div className="container max-w-7xl mx-auto px-4">
      <div className="relative glass-strong rounded-3xl p-10 md:p-14 overflow-hidden text-center shadow-lg">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.06]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Still have questions?</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Check out the marketplace first — see the strategies, read the metrics,
            and decide if this is for you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/marketplace" className="btn-primary group">
              Browse Strategies <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

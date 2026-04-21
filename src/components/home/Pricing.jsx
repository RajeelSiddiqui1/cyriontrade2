import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeader } from "../ui/SectionHeader";
import { plans } from "../../data/homeData";

export const Pricing = () => (
  <Section id="pricing" className="bg-card/20">
    <SectionHeader
      eyebrow="Pricing"
      title="Plans starting from $29/month."
      desc="Transparent pricing. No performance fees. Cancel anytime."
    />

    <div className="mt-14 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {plans.map((p) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-2xl p-7 flex flex-col ${
            p.popular ? "glass-strong border-primary/40 shadow-elevated" : "glass"
          }`}
        >
          {p.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-glow">
              Most popular
            </div>
          )}
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-bold tabular-nums">${p.price}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
          <ul className="mt-6 space-y-3 flex-1">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-primary-glow shrink-0 mt-0.5" />
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
          <button className={`mt-7 w-full ${
            p.popular ? "btn-primary" : "btn-secondary"
          }`}>
            {p.popular ? "Start free trial" : "Get started"}
          </button>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 text-center">
      <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        Compare all plans <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </Section>
);

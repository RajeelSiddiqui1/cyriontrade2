import { motion } from "framer-motion";
import { fadeUp, Section, SectionHeader } from "../ui/SectionHeader";
import { Search, Link2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Pick a Strategy",
    desc: "Browse strategies filtered by risk level, asset, and timeframe. Read how each one actually works before committing.",
  },
  {
    icon: Link2,
    title: "Connect Your Exchange",
    desc: "Link via API with read & trade permissions only. Setup takes about two minutes — no withdrawal access needed.",
  },
  {
    icon: Rocket,
    title: "Go Live & Learn",
    desc: "Activate with one click, then track performance in real time. See every trade, every decision, every result.",
  },
];

export const HowItWorks = () => (
  <Section id="how" className="bg-card/20">
    <SectionHeader
      eyebrow="Getting Started"
      title="Three steps. That's it."
      desc="No long onboarding. No complicated setup. You can be live in under five minutes."
    />

    <div className="mt-14 relative">
      <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="grid md:grid-cols-3 gap-6"
      >
        {steps.map((s, i) => (
          <motion.div key={s.title} variants={fadeUp} className="relative glass rounded-2xl p-7 text-center">
            <div className="relative mx-auto w-14 h-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-5">
              <s.icon className="w-6 h-6 text-primary-foreground" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-primary/40 grid place-items-center text-[11px] font-semibold text-primary-glow">
                {i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </Section>
);

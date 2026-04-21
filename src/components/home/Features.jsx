import { motion } from "framer-motion";
import { fadeUp, Section, SectionHeader } from "../ui/SectionHeader";
import {
  BookOpen,
  BarChart3,
  ShieldCheck,
  Network,
  TrendingUp,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Advanced Trading",
    desc: "Professional-grade trading tools with real-time market data and advanced charting capabilities.",
  },
  {
    icon: BarChart3,
    title: "Bank-Level Security",
    desc: "Your funds and data are protected with industry-leading security measures and encryption.",
  },
  {
    icon: ShieldCheck,
    title: "Lightning Fast",
    desc: "Execute trades in milliseconds with our high-performance trading engine and infrastructure.",
  },
  {
    icon: Network,
    title: "Smart Analytics",
    desc: "AI-powered insights and analytics to help you make informed trading decisions.",
  },
];

export const Features = () => (
  <Section id="features">
    <SectionHeader
      eyebrow="Why Choose CyrionTrade?"
      title="Built for traders who want to learn, not just copy."
      desc="Experience the future of cryptocurrency trading with our cutting-edge platform designed for both beginners and professionals."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {features.map((f) => (
        <motion.div
          key={f.title}
          variants={fadeUp}
          className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-[0.06] rounded-2xl transition-opacity" />
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center mb-5">
              <f.icon className="w-5 h-5 text-primary-glow" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

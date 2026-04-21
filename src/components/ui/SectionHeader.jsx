import { motion } from "framer-motion";
export const SectionHeader = ({ eyebrow, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="max-w-5xl mx-auto text-center mb-24 relative"
  >
    {eyebrow && (
      <span className="text-primary uppercase tracking-[0.5em] font-black text-xs md:text-[13px] mb-8 block opacity-80">
        {eyebrow}
      </span>
    )}
    <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85] mb-10">
      {title}
    </h2>
    <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10 opacity-40 shrink-0" />
    {desc && (
      <p className="text-muted-foreground mt-10 text-lg md:text-2xl font-bold leading-relaxed max-w-3xl mx-auto opacity-70 tracking-tight">
        {desc}
      </p>
    )}
  </motion.div>

);


export const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-20 md:py-32 ${className}`}>
    <div className="container max-w-7xl mx-auto px-4">{children}</div>
  </section>
);

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

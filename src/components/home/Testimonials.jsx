import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, Section, SectionHeader } from "../ui/SectionHeader";
import { testimonials } from "../../data/homeData";

export const Testimonials = () => (
  <Section>
    <SectionHeader
      eyebrow="Trusted by traders"
      title="What professional traders are saying."
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className="mt-14 grid md:grid-cols-3 gap-5"
    >
      {testimonials.map((t) => (
        <motion.figure key={t.name} variants={fadeUp} className="glass rounded-2xl p-7 flex flex-col">
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning text-warning" />
            ))}
          </div>
          <blockquote className="text-foreground/90 leading-relaxed flex-1">"{t.quote}"</blockquote>
          <figcaption className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
            <div className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-md">
              {t.result}
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  </Section>
);

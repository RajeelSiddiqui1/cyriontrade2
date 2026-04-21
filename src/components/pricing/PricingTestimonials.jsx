import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/pricingData";

export const PricingTestimonials = () => (
  <section className="py-24 px-4 overflow-hidden">
    <div className="container max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {testimonials.title}
        </h2>
        <div className="w-16 h-1 bg-primary/30 mx-auto mt-6" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-strong p-8 rounded-[2rem] border border-border/50 flex flex-col"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 italic">
              "{item.text}"
            </p>

            <div className="mt-auto pt-6 border-t border-border/30">
              <div className="font-black text-foreground text-sm uppercase tracking-wider">{item.name}</div>
              {item.company && (
                <div className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">
                  {item.company}
                </div>
              )}
              <a 
                href="#" 
                className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
              >
                {item.linkText}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

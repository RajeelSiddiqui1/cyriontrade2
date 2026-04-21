import { Check, X, Info } from "lucide-react";
import { comparison, plans } from "@/data/pricingData";
import { motion, AnimatePresence } from "framer-motion";
import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";

export const PricingCompare = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">{comparison.title}</h2>
          <div className="w-16 h-1 bg-primary/30 mx-auto mt-6" />
        </div>

        <div className="surface overflow-hidden rounded-[2rem] border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="glass-strong border-b border-border/50">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-muted-foreground w-1/3">Features</th>
                  {plans.map((p) => (
                    <th key={p.id} className="px-4 py-6 text-center text-xs font-black uppercase tracking-widest text-foreground">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.features.map((feature, idx) => {
                  const isExpanded = expandedIndex === idx;
                  const planValues = [feature.pioneer, feature.explorer, feature.adventurer, feature.hero];
                  
                  return (
                    <Fragment key={feature.name}>
                        <tr 
                          onClick={() => toggleExpand(idx)}
                          className={cn(
                             "border-b border-border/20 transition-all cursor-pointer group",
                             isExpanded ? "bg-primary/5" : "hover:bg-primary/5"
                          )}
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "text-sm font-black transition-colors",
                                    isExpanded ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}>
                                  {feature.name}
                                </span>
                                <Info className={cn(
                                    "w-4 h-4 transition-colors",
                                    isExpanded ? "text-primary fill-primary/10" : "text-muted-foreground/40 group-hover:text-primary/60"
                                )} />
                            </div>
                          </td>
                          {planValues.map((included, i) => (
                            <td key={i} className="px-4 py-5">
                              <div className="flex justify-center">
                                {included ? (
                                  <div className={cn(
                                      "w-8 h-8 rounded-full flex items-center justify-center transition-transform",
                                      isExpanded ? "bg-primary/20 scale-110" : "bg-primary/10 group-hover:scale-110"
                                  )}>
                                    <Check className="w-4 h-4 text-primary" />
                                  </div>
                                ) : (
                                  <X className="w-4 h-4 text-muted-foreground/10" />
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                        
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.tr 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-primary/5"
                                >
                                    <td colSpan={5} className="px-8 py-0">
                                        <motion.div 
                                            initial={{ y: -10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="pb-6 pt-2 border-l-4 border-primary pl-6"
                                        >
                                            <p className="text-sm font-bold text-muted-foreground/80 leading-relaxed max-w-4xl">
                                                {feature.info}
                                            </p>
                                        </motion.div>
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

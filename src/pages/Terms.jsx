import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { termsData } from "@/data/termsData";

const Terms = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-foreground font-['Outfit',sans-serif]">
      <SiteNav />

      {/* Header Section */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase italic italic-gradient leading-none">
              Terms & <span className="text-white">Conditions</span>
            </h1>
            <p className="text-muted-foreground font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
              {termsData.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-4 relative z-10">
        <div className="container max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-[2.5rem] md:rounded-[4rem] border border-white/5 p-10 md:p-20 bg-white/[0.01] backdrop-blur-2xl ring-1 ring-white/5"
          >
            <div className="space-y-16">
              {termsData.sections.map((section, index) => (
                <div key={section.id} className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-black uppercase italic italic-gradient tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex} 
                        className="text-muted-foreground/70 text-base md:text-xl leading-relaxed font-medium"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Contact */}
            
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Terms;

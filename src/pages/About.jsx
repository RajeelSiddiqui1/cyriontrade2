import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { aboutData } from "@/data/aboutData";
import { cn } from "@/lib/utils";

const About = () => {
  const { hero, sections, future } = aboutData;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden">
        {/* Ambient background effect like Home page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />
        
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <span className="text-primary uppercase tracking-[0.4em] font-black text-xs md:text-sm mb-6 block">
              {hero.title}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-12 max-w-4xl mx-auto leading-[1.1]">
              {hero.subtitle}
            </h1>
            
            <motion.div 
              className="relative inline-block mt-8 group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Outer Glow using theme primary */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-full" />
              
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card">
                <img 
                  src={hero.image} 
                  alt="About Hero" 
                  className="w-full max-w-4xl max-h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Alternating Sections */}
      {sections.map((section, index) => (
        <section key={section.id} className="py-24 px-4 overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className={cn(
              "flex flex-col items-center gap-16 md:gap-24",
              section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            )}>
              {/* Text Part */}
              <motion.div 
                className="flex-1 space-y-8"
                {...fadeIn}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                  {section.title}
                </h2>
                <div className="w-12 h-1.5 rounded-full bg-primary/30" />
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
                  {section.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>

              {/* Image Part */}
              <motion.div 
                className="flex-1 relative group"
                initial={{ opacity: 0, x: section.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -inset-4 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-2xl transform group-hover:scale-[1.01] transition-all duration-500 bg-card">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-auto object-cover aspect-[4/3] opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Future Section */}
      <section className="py-32 px-4 relative">
        {/* Glow effect for transition */}
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-primary/5 blur-[100px] pointer-events-none" />
        
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-12">
              {future.title}
            </h2>

            {/* Tags/Chips - Using website's chip style */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {future.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-6 py-2.5 rounded-2xl border border-border bg-secondary/50 text-muted-foreground text-xs font-black uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              {future.descriptionTop}
            </p>

            {/* Illustration/Image */}
            <motion.div 
              className="relative max-w-4xl mx-auto mb-20 group"
              whileInView={{ scale: [0.98, 1], opacity: [0, 1] }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-3xl rounded-[3rem]" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
                <img 
                  src={future.mainImage} 
                  alt="Future of Crypto" 
                  className="w-full h-auto opacity-95 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>

            {/* Final Text */}
            <div className="space-y-8 text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium pb-20">
              {future.contentBottom.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default About;



import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Phone, MapPin, Clock, MessageSquare, Shield, Globe, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent uppercase italic">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
              Our team of experts is dedicated to providing you with the support and guidance you need to excel in the markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Email Support", value: "support@cyriontrade.com", desc: "Response within 24 hours" },
              { icon: MessageSquare, title: "Community", value: "Discord Server", desc: "Join 5,000+ traders" },
              { icon: Globe, title: "Global Office", value: "Dubai, UAE", desc: "CyrionTrade International" },
            ].map((card, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <card.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-2">{card.title}</h3>
                <p className="text-lg font-black text-foreground mb-1">{card.value}</p>
                <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            {...fadeIn}
            className="glass-strong rounded-[4rem] border border-border/50 p-10 md:p-20 relative overflow-hidden grid lg:grid-cols-2 gap-20 items-center"
          >
             <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                  <Send className="w-3 h-3" /> Direct Access
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                   Questions? <br/><span className="text-primary">We have answers.</span>
                </h2>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-md">
                   Fill out the form and our specialized support team will get back to you with a tailor-made solution.
                </p>
                
                <div className="space-y-4 pt-10">
                   <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground/80">
                      <Shield className="w-5 h-5 text-primary" />
                      Encrypted Communication
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground/80">
                      <Clock className="w-5 h-5 text-primary" />
                      Priority Support for PRO Users
                   </div>
                </div>
             </div>

             <div className="relative">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-20"
                  >
                     <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-success" />
                     </div>
                     <h3 className="text-3xl font-black">Message Sent!</h3>
                     <p className="text-muted-foreground font-medium">Thank you for reaching out. We'll be in touch shortly.</p>
                     <button onClick={() => setSubmitted(false)} className="btn-secondary px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest">Send Another</button>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                       <input 
                         type="text" 
                         required 
                         placeholder="Your Name" 
                         className="w-full bg-secondary/20 border border-border/50 rounded-2xl px-8 py-5 outline-none focus:border-primary/50 transition-all font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <input 
                         type="email" 
                         required 
                         placeholder="Email Address" 
                         className="w-full bg-secondary/20 border border-border/50 rounded-2xl px-8 py-5 outline-none focus:border-primary/50 transition-all font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <textarea 
                         rows={4} 
                         required 
                         placeholder="How can we help you today?" 
                         className="w-full bg-secondary/20 border border-border/50 rounded-2xl px-8 py-5 outline-none focus:border-primary/50 transition-all font-bold resize-none"
                       />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary !py-5 rounded-2xl text-sm font-black uppercase tracking-widest italic"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    </button>
                  </form>
                )}
             </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Contact;

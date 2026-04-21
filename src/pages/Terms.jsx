import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Shield, FileText, Scale, Zap, Lock, Globe } from "lucide-react";

const Terms = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      icon: FileText,
      title: "Agreement to Terms",
      content: "By accessing or using CyrionTrade, you agree to be bound by these Terms of Service. If you do not agree, you may not use our platform or services. These terms apply to all users, visitors, and others who access the service."
    },
    {
      icon: Shield,
      title: "Risk Disclosure",
      content: "Trading cryptocurrencies involves high risk and may not be suitable for all investors. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment."
    },
    {
      icon: Lock,
      title: "User Accounts",
      content: "You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account."
    },
    {
      icon: Zap,
      title: "Service Availability",
      content: "We strive to provide 24/7 service availability. However, we do not guarantee that our service will be uninterrupted or error-free. We reserve the right to withdraw or amend our service without notice."
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: "The Service and its original content, features, and functionality are and will remain the exclusive property of CyrionTrade and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent."
    },
    {
      icon: Globe,
      title: "Governing Law",
      content: "These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Header Section */}
      <section className="pt-40 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase italic italic-gradient">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-muted-foreground font-black tracking-[0.3em] uppercase text-[10px]">
              Last Updated: April 20, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-[2.5rem] border border-border/50 p-10 md:p-14 hover:border-primary/20 transition-all duration-500"
              >
                 <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                       <section.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-2xl md:text-3xl font-black tracking-tight">{section.title}</h2>
                       <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                          {section.content}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            {...fadeIn}
            className="mt-20 p-12 rounded-[3rem] bg-secondary/10 border border-border/20 text-center"
          >
             <p className="text-sm font-bold text-muted-foreground/60 max-w-2xl mx-auto">
                If you have any questions about these Terms, please contact our legal department at <span className="text-primary">legal@cyriontrade.com</span>.
             </p>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Terms;

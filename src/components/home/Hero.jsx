import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BookOpen, TrendingUp, BarChart3, Shield, Cpu, Play, Search, Activity, Sparkles, Zap, MoveRightIcon } from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";
import { fadeUp } from "../ui/SectionHeader";
import { heroChart } from "../../data/homeData";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-24 md:pt-36 pb-20 overflow-hidden">
      {/* Enhanced Background Architecture */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-[0.15] dark:opacity-40" />
      
      {/* Large Ambient Orbs - Theme Aware */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [-30, 30, -30],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          x: [30, -30, 30],
          y: [20, -20, 20]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <motion.div style={{ y, opacity }} className="container max-w-7xl mx-auto px-4 relative z-10 -mt-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 variants={fadeUp} className="text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.9] text-gradient-primary py-4">
            CyrionTrade
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">

           The most advanced cryptocurrency trading platform designed for professionals. Trade with confidence using our AI-powered tools and real-time market insights.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="/marketplace" className="btn-primary px-10 py-4.5 text-lg group shadow-glow rounded-2xl">
             Start Trading Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#how" className="btn-secondary px-10 py-4.5 text-lg group rounded-2xl bg-white/60 dark:bg-white/5">
              {/* <MoveRightIcon className="w-5 h-5 fill-current" /> */}
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Ecosystem & Dashboard */}
        <div className="mt-24 relative max-w-5xl mx-auto lg:px-12">
          
          {/* Floating Metric 1 - Oracle Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -left-4 lg:-left-24 top-0 z-30 pointer-events-none"
          >
            <OrbitingChip 
              icon={TrendingUp} 
              label="Live Signal" 
              value="Momentum +4.2%" 
              color="success" 
              delay={0}
            />
          </motion.div>

          {/* Floating Metric 2 - Security Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -right-4 lg:-right-24 bottom-12 z-30 pointer-events-none"
          >
            <OrbitingChip 
              icon={Shield} 
              label="Protection" 
              value="Risk Guard Active" 
              color="primary" 
              delay={2}
            />
          </motion.div>

          {/* Floating Decorators */}
          <div className="absolute -top-10 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />

          {/* Main Dashboard Interaction Area */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-3xl rounded-[3rem]" />
            <DashboardMockup />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const OrbitingChip = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    animate={{ 
      y: [0, -15, 0],
      rotate: [0, 1, 0, -1, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: delay 
    }}
    className={cn(
      "glass-strong p-4 rounded-[2rem] shadow-elevated border-white/20 backdrop-blur-3xl hidden md:flex flex-col items-center gap-2 min-w-[160px]",
      "bg-white/80 dark:bg-white/10"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-full grid place-items-center shadow-lg",
      color === "success" ? "bg-success text-white" : "bg-primary text-white"
    )}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="text-center">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-0.5">{label}</div>
      <div className="text-xs font-bold text-foreground">{value}</div>
    </div>
    <div className="w-8 h-1 bg-muted/40 rounded-full overflow-hidden mt-1">
      <motion.div 
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={cn("h-full w-1/2", color === "success" ? "bg-success" : "bg-primary")}
      />
    </div>
  </motion.div>
);

const DashboardMockup = () => (
  <div className="relative group">
    <div className="relative glass-strong rounded-[2.5rem] border border-white/20 dark:border-white/10 p-4 md:p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] backdrop-blur-3xl overflow-hidden bg-white/40 dark:bg-white/5">
      {/* Visual Accents */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="h-4 w-px bg-border mx-1" />
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-xl text-[10px] font-bold text-muted-foreground">
            
            CyrionTrade
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center cursor-pointer hover:bg-white/20 transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary shadow-glow p-0.5">
            <div className="w-full h-full rounded-[0.9rem] bg-background grid place-items-center">
               <div className="w-5 h-5 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <QuickStat label="Live Profit" value="+$4,102" trend="+18.4%" />
            <QuickStat label="Market Depth" value="Optimal" status="safe" />
            <QuickStat label="Active Exchange" value="BYBIT_MAIN" badge="LIVE" />
          </div>

          <div className="rounded-3xl bg-secondary/30 dark:bg-black/20 border border-border p-6 relative overflow-hidden">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Execution Flow</h4>
                <p className="text-xl font-bold mt-1">Institutional Momentum</p>
              </div>
              <div className="flex gap-1 bg-secondary/80 p-1 rounded-xl">
                {["15M", "1H", "4H"].map(t => (
                  <button key={t} className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                    t === "1H" ? "bg-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground"
                  )}>{t}</button>
                ))}
              </div>
            </div>

            <div className="h-64 mt-4 relative min-w-0">
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-10" />
              <ResponsiveContainer width="100%" height="100%" debounce={100}>
                <AreaChart data={heroChart}>
                  <defs>
                    <linearGradient id="premiumChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '16px',
                      fontSize: '11px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <XAxis dataKey="t" hide />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    fill="url(#premiumChart)"
                    animationDuration={2500}
                    strokeLinecap="round"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Neural Layers</h4>
            <div className="space-y-3">
              <StrategyItem name="MOMENTUM_v1" perf="+1,202%" active />
              <StrategyItem name="ALPHA_GRID" perf="+60.5%" />
              <StrategyItem name="SCALPER_PRO" perf="-12.3%" />
            </div>
          </div>
          
          <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
             <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary">System Health</span>
             </div>
             <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["100%", "95%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-primary" 
                />
             </div>
             <p className="text-[9px] text-muted-foreground mt-2 font-medium">99.8% Latency Score</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QuickStat = ({ label, value, trend, status, badge }) => (
  <div className="bg-secondary/40 p-5 rounded-2xl border border-border/50">
    <div className="text-[9px] uppercase tracking-widest font-black text-muted-foreground mb-2">{label}</div>
    <div className="flex items-center justify-between gap-2">
      <div className="text-lg font-bold truncate">{value}</div>
      {trend && <span className="text-xs text-success font-black">{trend}</span>}
      {status === 'safe' && <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_12px_hsl(var(--success))]" />}
      {badge && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/20 text-primary font-black">{badge}</span>}
    </div>
  </div>
);

const StrategyItem = ({ name, perf, active }) => (
  <div className={cn(
    "p-4 rounded-2xl border transition-all duration-300",
    active ? "bg-primary text-white border-transparent shadow-glow" : "bg-secondary/40 border-border/50 opacity-70 hover:opacity-100"
  )}>
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] font-black tracking-tight">{name}</div>
      <div className={cn("text-[10px] font-black", active ? "text-white" : perf.startsWith('+') ? "text-success" : "text-danger")}>
        {perf}
      </div>
    </div>
    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: active ? "85%" : "40%" }}
        className={cn("h-full", active ? "bg-white" : "bg-primary")}
      />
    </div>
  </div>
);

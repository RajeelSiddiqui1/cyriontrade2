import { useState, useEffect } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { Copy, Check, Users, TrendingUp, DollarSign, Clock, Gift, Share2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { referralAPI, bonusAPI } from "../services/api";
import { useToast } from "../context/ToastContext";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="glass-card p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all group">
    <div className={`w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-primary`} />
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">{label}</div>
    <div className="text-3xl font-black text-foreground tracking-tight">{value}</div>
  </div>
);

const Referrals = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, totalEarned: 0 });
  const [bonusBalance, setBonusBalance] = useState(0);
  const [loadingBonus, setLoadingBonus] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = (await referralAPI.getReferralStats()).data;
        setStats(statsData);
        
        const codeData = (await referralAPI.getReferralCode()).data;
        setReferralCode(codeData.referralCode);
        setReferralLink(codeData.referralLink);

        // Fetch actual bonus balance
        setLoadingBonus(true);
        const bonusResponse = await bonusAPI.getBonusBalance();
        setBonusBalance(bonusResponse.data.balance || 0);
      } catch (err) {
        console.error("Error fetching referral data:", err);
      } finally {
        setLoadingBonus(false);
      }
    };
    fetchData();
  }, []);

  const copyToClipboard = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join CyrionTrade!',
          text: `Empower your trading with CyrionTrade. Use my code ${referralCode} to get started and claim your bonus!`,
          url: referralLink,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
            console.error("Error sharing:", err);
            showToast("Failed to share. Please try copying the link.", "error");
        }
      }
    } else {
      copyToClipboard(referralLink, setCopiedLink);
      showToast("Native sharing not supported. Link copied to clipboard.", "info");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-32 bg-background">
      <SiteNav />
      
      <main className="flex-1 container mx-auto max-w-5xl px-6 mb-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6"
          >
            Invite friends and earn <br /> 
            <span className="text-primary italic">rewards together</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-bold"
          >
            Share your referral code and get rewarded for every successful referral
          </motion.p>
        </div>

        {/* Main Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-[3rem] border border-primary/20 p-12 text-center mb-16 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/5">
                <Gift className="w-8 h-8 text-primary" />
            </div>
            
            {loadingBonus ? (
                <div className="flex justify-center py-6">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="text-6xl md:text-8xl font-black text-primary tracking-tighter mb-4 tabular-nums">
                    ${bonusBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
            )}
            
            <div className="text-[12px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Total Bonus Balance</div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <StatCard icon={Users} label="Total Referrals" value={stats.total || 0} />
            <StatCard icon={TrendingUp} label="Completed" value={stats.completed || 0} />
            <StatCard icon={DollarSign} label="Total Earned" value={`$${stats.totalEarned || 0}`} />
            <StatCard icon={Clock} label="Pending" value={stats.pending || 0} />
        </div>

        {/* Referral Code Section */}
        <div className="glass-card rounded-[2.5rem] border border-border/50 p-10 mb-16">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-8">Your Referral Code</div>
            
            <div className="flex flex-col md:flex-row gap-4 items-stretch mb-8">
                <div className="flex-1 glass-strong border border-primary/30 rounded-2xl px-8 py-6 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black tracking-[0.3em] text-primary">{referralCode || "LOADING..."}</span>
                </div>
                <button 
                    onClick={() => copyToClipboard(referralCode, setCopied)}
                    className="btn-primary rounded-2xl px-10 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span className="font-black uppercase tracking-widest text-xs">Copy Code</span>
                </button>
            </div>

            <div className="flex items-center gap-4 bg-secondary/30 rounded-xl px-6 py-4 border border-border/40">
                <div className="flex-1 truncate text-[10px] font-bold text-muted-foreground/60">{referralLink || "Your link will appear here..."}</div>
                <div className="flex items-center gap-3 border-l border-border/20 pl-4">
                    <button onClick={() => copyToClipboard(referralLink, setCopiedLink)} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors group">
                        {copiedLink ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary" />}
                    </button>
                    <button onClick={handleShare} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors group">
                        <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                </div>
            </div>
        </div>

        {/* How it Works */}
        <div className="glass-card rounded-[2.5rem] border border-border/50 p-10">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-10">How it Works</div>
            
            <div className="space-y-6">
                {[
                    { step: 1, title: "Share Your Code", desc: "Share your unique referral code or link with friends and family" },
                    { step: 2, title: "They Sign Up", desc: "Your friend signs up using your referral code and gets $10 welcome bonus" },
                    { step: 3, title: "You Both Earn", desc: "When they complete their first trade, you earn $25 referral bonus!" },
                ].map((item) => (
                    <div key={item.step} className="flex items-center gap-8 p-8 rounded-3xl bg-secondary/20 border border-border/30 hover:border-primary/20 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            {item.step}
                        </div>
                        <div>
                            <div className="font-black text-foreground mb-1">{item.title}</div>
                            <div className="text-sm font-bold text-muted-foreground">{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Referrals;

import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, Wallet, Gift, User, ChevronRight, Copy, Plus, Check, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { bonusAPI } from "../../services/api";

export const ProfileSidebar = ({ isOpen, onClose }) => {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [bonusBalance, setBonusBalance] = useState(0);
    const [loadingBonus, setLoadingBonus] = useState(false);
    const { user, logout, setUser } = useAuth();

    useEffect(() => {
        if (isOpen && user) {
            fetchBonusBalance();
        }
    }, [isOpen, user]);

    const fetchBonusBalance = async () => {
        try {
            setLoadingBonus(true);
            const response = await bonusAPI.getBonusBalance();
            setBonusBalance(response.data.balance || 0);
        } catch (error) {
            console.error("Failed to fetch bonus balance:", error);
        } finally {
            setLoadingBonus(false);
        }
    };

    if (!user) return null;

    const truncateAddress = (address) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleDisconnect = async () => {
        if (!window.confirm("Are you sure you want to disconnect your wallet?")) return;
        
        setIsDisconnecting(true);
        try {
            const { userAPI } = await import("../../services/api");
            await userAPI.updateProfile({
                walletAddress: null,
                walletConnected: false
            });
            
            // Update local state
            setUser({
                ...user,
                walletAddress: null,
                walletConnected: false
            });
        } catch (error) {
            console.error("Failed to disconnect wallet:", error);
            alert("Failed to disconnect wallet. Please try again.");
        } finally {
            setIsDisconnecting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[150] bg-background/60 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm z-[200] bg-background border-l border-border/50 shadow-2xl flex flex-col"
                    >
                        {/* Header / User Info */}
                        <div className="relative pt-16 pb-12 px-8 flex flex-col items-center bg-gradient-to-b from-primary/20 via-background to-background overflow-hidden">
                            <div className="absolute top-6 right-6">
                                <button onClick={onClose} className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group">
                                    <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                </button>
                            </div>

                            {/* Ambient Glow */}
                            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/20 blur-[100px] rounded-full" />

                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-primary/20 p-1 mb-6">
                                    <div className="w-full h-full rounded-full bg-secondary/50 flex items-center justify-center border border-border/50 overflow-hidden">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-10 h-10 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight text-foreground mb-1">{user.displayName || 'User'}</h3>
                            <p className="text-xs font-bold text-muted-foreground/60">{user.email}</p>
                        </div>

                        {/* Content Actions */}
                        <div className="flex-1 px-8 py-4 space-y-8 overflow-y-auto">
                            {/* Wallet Section */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Wallet Connection</div>

                                {user.walletAddress ? (
                                    <div className="glass-strong rounded-2xl border border-primary/20 p-4 flex flex-col gap-3 group/wallet">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="text-[9px] font-black uppercase tracking-widest text-primary">Connected</div>
                                                    <div className="text-xs font-bold text-foreground tabular-nums">{truncateAddress(user.walletAddress)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(user.walletAddress);
                                                        setCopied(true);
                                                        setTimeout(() => setCopied(false), 2000);
                                                    }}
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                                    title="Copy Address"
                                                >
                                                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={handleDisconnect}
                                            disabled={isDisconnecting}
                                            className="w-full py-2 px-4 rounded-xl border border-danger/20 bg-danger/5 hover:bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                        >
                                            {isDisconnecting ? "Disconnecting..." : "Remove Wallet"}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsWalletModalOpen(true)}
                                        className="w-full group relative overflow-hidden bg-primary p-[1px] rounded-2xl transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                                    >
                                        <div className="bg-primary px-6 py-4 rounded-[calc(1rem-1px)] flex items-center justify-center gap-3">
                                            <Plus className="w-4 h-4 text-primary-foreground stroke-[3px]" />
                                            <span className="text-xs font-black uppercase tracking-widest text-primary-foreground">Add Wallet</span>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Balance Section */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Bonus Balance</div>
                                <div className="glass-strong rounded-[2.5rem] border border-border/50 overflow-hidden group">
                                    <div className="p-8 flex flex-col items-center gap-4 bg-gradient-to-br from-primary/5 to-transparent">
                                        {loadingBonus ? (
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                        ) : (
                                          <div className="text-4xl font-black text-primary tracking-tighter tabular-nums">
                                              ${bonusBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                          </div>
                                        )}
                                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/60 transition-colors">Available Rewards</div>
                                    </div>
                                </div>
                            </div>

                            {/* Subscriptions/Settings placeholder */}

                        </div>

                        {/* Footer / Logout */}
                        <div className="p-8 border-t border-border/20">
                            <button
                                onClick={logout}
                                className="w-full btn-secondary py-4 rounded-2xl flex items-center justify-center gap-3 group border border-border/50 hover:bg-danger/10 hover:border-danger/30 hover:text-danger transition-all duration-300"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-black uppercase tracking-widest text-xs">Logout</span>
                            </button>
                        </div>
                    </motion.div>

                    <ConnectWalletModal
                        isOpen={isWalletModalOpen}
                        onClose={() => setIsWalletModalOpen(false)}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

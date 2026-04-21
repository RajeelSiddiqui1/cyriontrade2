import { Modal } from "./Modal";
import { User, Lock, Eye, EyeOff, Gift, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password, displayName || email.split("@")[0]);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="pt-20 pb-12 px-10 flex flex-col items-center">
        <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">
            Sign up
        </h2>
        <p className="text-xs font-bold text-muted-foreground mb-12">
            Already have an account? <button onClick={onSwitchToLogin} className="text-primary hover:underline">Log in</button>
        </p>

        <form className="w-full space-y-4 mb-8" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger text-xs font-bold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3 text-success text-xs font-bold animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {success}
              </div>
            )}

            <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-bold text-sm"
                />
            </div>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type={showPass ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-bold text-sm"
                />
                <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
            <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type={showConfirm ? "text" : "password"} 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-bold text-sm"
                />
                <button 
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
            <div className="relative group">
                <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type="text" 
                    placeholder="Referral Code (Optional)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/30 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50 font-bold text-sm"
                />
            </div>

            <div className="text-center pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                    Get $10 bonus with a referral code!
                </p>
            </div>

            <button 
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 rounded-full font-black uppercase tracking-widest text-xs mt-6 flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign up"}
            </button>
        </form>
      </div>
    </Modal>
  );
};

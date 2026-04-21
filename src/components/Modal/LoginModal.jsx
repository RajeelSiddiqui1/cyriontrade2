import { Modal } from "./Modal";
import { User, Lock, Eye, EyeOff, Check, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="pt-20 pb-12 px-10 flex flex-col items-center">
        <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">
            Log in
        </h2>
        <p className="text-xs font-bold text-muted-foreground mb-12">
            Don't have an account? <button onClick={onSwitchToSignup} className="text-primary hover:underline">Sign up</button>
        </p>

        <form className="w-full space-y-4 mb-8" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger text-xs font-bold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
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

            <label className="flex items-center gap-3 cursor-pointer group pt-2">
                <input 
                    type="checkbox" 
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="hidden" 
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${remember ? 'bg-primary border-primary' : 'border-border/50 group-hover:border-primary/50'}`}>
                    {remember && <Check className="w-3 h-3 text-primary-foreground stroke-[3px]" />}
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">Remember me</span>
            </label>

            <button 
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 rounded-full font-black uppercase tracking-widest text-xs mt-6 flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log in"}
            </button>
        </form>

        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
            Forgot <button className="text-primary hover:underline">username</button> / <button className="text-primary hover:underline">Password</button>?
        </p>
      </div>
    </Modal>
  );
};

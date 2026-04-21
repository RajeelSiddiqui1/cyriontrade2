import { Modal } from "./Modal";
import { Wallet, X, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";

export const ConnectWalletModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const connectMetaMask = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install it to continue.");
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];

      // In a real app, you would sign a message here to verify ownership
      // const signature = await window.ethereum.request({
      //   method: 'personal_sign',
      //   params: [`Welcome to CyrionTrade! Please sign this message to verify your wallet.`, walletAddress],
      // });

      // Call backend to save wallet address
      if (user) {
        await authAPI.completeSignup(
          user.uid,
          walletAddress,
          "verified_by_client" // Placeholder signature
        );
      }

      // Close modal on success
      setTimeout(() => {
        onClose();
        setIsLoading(false);
        // Refresh page or update context state here if needed
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/20 blur-[60px] opacity-50" />

        <div className="relative pt-16 pb-12 px-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-foreground/20 flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
            <Wallet className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-foreground mb-4 text-center">
            Connect Your Wallet
          </h2>
          <p className="text-sm font-bold text-muted-foreground mb-10 text-center px-4">
            Securely connect your wallet to continue
          </p>

          {error && (
            <div className="w-full p-4 rounded-xl bg-danger/10 border border-danger/20 flex items-center gap-3 text-danger text-xs font-bold mb-6 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="w-full space-y-4">
            <button
              onClick={connectMetaMask}
              disabled={isLoading}
              className="w-full group relative flex items-center p-1 rounded-2xl bg-gradient-to-r from-[#F6851B] to-[#E2761B] hover:shadow-lg hover:shadow-orange-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              <div className="flex-1 bg-gradient-to-r from-[#F6851B] to-[#E2761B] rounded-[calc(1rem-2px)] py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="/metamask.png" alt="MetaMask" className="w-8 h-8 object-contain" />
                  <div className="text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Connect With</div>
                    <div className="text-xl font-black text-white tracking-tight">METAMASK</div>
                  </div>
                </div>
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <ShieldCheck className="w-6 h-6 text-white/50" />}
              </div>
            </button>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Your connection is secure and encrypted
            </div>
            <p className="text-[9px] font-bold text-muted-foreground/40 text-center px-8">
              We never store your private keys or seed phrases.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

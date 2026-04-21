import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { cryptoAPI } from "@/services/api";

export const CoinSlider = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await cryptoAPI.getCoinList();
      // Take top 20 or so for the slider
      const data = Array.isArray(response.data) ? response.data : [];
      setCoins(data.slice(0, 20));
    } catch (err) {
      console.error("Slider fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Duplicate data for infinite effect
  const duplicatedCoins = [...coins, ...coins, ...coins];

  if (loading || coins.length === 0) {
    return (
      <div className="w-full bg-card/10 backdrop-blur-md border-y border-border/20 py-8 text-center">
         <div className="w-5 h-5 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full bg-card/30 backdrop-blur-md border-y border-border/40 py-4 overflow-hidden relative group">
      {/* Side Gradients for fading effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{
          x: ["0%", "-33.33%"], // Adjusted for tripling to ensure smoothness
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedCoins.map((coin, index) => (
          <div
            key={`${coin.id}-${index}`}
            onClick={() => navigate(`/coin/${coin.id}`)}
            className="flex items-center gap-4 px-6 py-2 hover:bg-primary/10 rounded-2xl transition-all shrink-0 group/item cursor-pointer border border-transparent hover:border-primary/20"
          >
            <div className="w-10 h-10 rounded-full bg-secondary/50 p-2 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-lg ring-1 ring-white/5">
              <img src={coin.image} alt={coin.name} className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-foreground text-[11px] uppercase tracking-[0.2em]">{coin.symbol}</span>
                <span
                  className={cn(
                    "text-[10px] font-black tabular-nums px-2 py-0.5 rounded-md bg-secondary/30",
                    (coin.price_change_percentage_24h || 0) > 0 ? "text-success" : "text-danger"
                  )}
                >
                  {(coin.price_change_percentage_24h || 0) > 0 ? "+" : ""}
                  {(coin.price_change_percentage_24h || 0).toFixed(1)}%
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums tracking-tight">
                ${(coin.current_price || 0).toLocaleString("en-US", { minimumFractionDigits: (coin.current_price || 0) < 1 ? 4 : 2 })}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

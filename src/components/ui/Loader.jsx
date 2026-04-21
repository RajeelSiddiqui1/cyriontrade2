import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon } from "lucide-react";

export const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial initial loading delay to show off the loader
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="absolute inset-0 grid-bg opacity-20" />
            
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow relative overflow-hidden"
              >
                {/* Loader animation effects */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-white/20 -skew-x-12 w-1/2" 
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <Hexagon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" strokeWidth={2} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 font-bold text-2xl tracking-tight text-foreground flex items-baseline gap-1"
              >
                CyrionTrade
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

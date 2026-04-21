import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-4 pointer-events-none w-full max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <ToastItem toast={toast} onRemove={removeToast} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-danger" />,
    info: <Info className="w-5 h-5 text-primary" />,
  };

  return (
    <div className={cn(
      "glass-strong p-5 rounded-2xl border border-white/5 shadow-2xl flex items-start gap-4 relative overflow-hidden group",
      "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    )}>
      <div className="shrink-0 pt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">
          System Notification
        </p>
        <p className="text-sm font-bold text-white/90 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-1 rounded-lg hover:bg-white/5 transition-colors text-white/20 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Progress bar */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-primary/40"
      />
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

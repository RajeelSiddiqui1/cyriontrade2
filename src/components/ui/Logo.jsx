import { Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className, textClassName, iconClassName }) => (
  <div className={cn("flex items-center gap-2.5", className)}>
    <div className={cn(
      "w-8 h-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow relative overflow-hidden",
      iconClassName
    )}>
      {/* Abstract internal shapes */}
      <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-3" />
      <Hexagon className="w-5 h-5 text-primary-foreground relative z-10" strokeWidth={2.5} />
    </div>
    <span className={cn("font-bold text-lg tracking-tight", textClassName)}>CyrionTrade</span>
  </div>
);

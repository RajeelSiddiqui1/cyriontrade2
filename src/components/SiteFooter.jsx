import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

export const SiteFooter = () => (
  <footer className="border-t border-border/60 py-14 bg-background">
    <div className="container max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Info */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex flex-col items-start gap-2.5">
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
            Learn trading strategies, understand how they work, and execute with confidence across major exchanges.
          </p>
        </div>

        {/* Link Columns */}
        {[
          {
            title: "Explore",
            links: [
              ["Home", "/"],
              ["Marketplace", "/marketplace"],
              ["Trading Strategies", "/marketplace"],
            ],
          },
          {
            title: "Services",
            links: [
              ["Signals", "/marketplace"],
              ["Copy Bots", "/marketplace"],
              ["Pricing", "/pricing"],
            ],
          },
          {
            title: "Company",
            links: [
              ["About CyrionTrade", "/about"],
              ["Contact Us", "/contact"],
              ["Terms of Service", "/terms"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold text-foreground mb-6">{col.title}</div>
            <ul className="space-y-3">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} CyrionTrade. All rights reserved.</div>
        <div className="max-w-2xl text-right">
          Trading involves risk. Past performance does not guarantee future results.
        </div>
      </div>
    </div>
  </footer>
);
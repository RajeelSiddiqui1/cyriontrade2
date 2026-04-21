import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, User, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { NavLink } from "@/components/ui/NavLink";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { LoginModal } from "@/components/Modal/LoginModal";
import { SignupModal } from "@/components/Modal/SignupModal";
import { ProfileSidebar } from "@/components/Modal/ProfileSidebar";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export const SiteNav = () => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const handleOpenLogin = () => openLogin();
    window.addEventListener('openLogin', handleOpenLogin);
    return () => window.removeEventListener('openLogin', handleOpenLogin);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container mx-auto max-w-7xl mt-4 px-4">
        <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => {
              const isHash = l.to.includes("#");
              if (isHash) {
                return (
                  <a key={l.to} href={l.to} className="hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="hover:text-foreground transition-colors"
                  activeClassName="text-foreground"
                >
                  {l.label}
                </NavLink>
              );
            })}
            
            {user && (
              <NavLink
                to="/referrals"
                className="relative group hover:text-foreground transition-colors flex items-center"
                activeClassName="text-foreground font-bold"
              >
                <div className="relative">
                  <Gift className="w-5 h-5 text-yellow-500" />
                  <div className="absolute -top-3 -right-4 bg-danger text-[7px] font-black px-1.5 py-0.5 rounded-full text-white scale-90 animate-pulse border-2 border-background">
                    NEW
                  </div>
                </div>
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {!user ? (
              <>
                <button 
                  onClick={openLogin}
                  className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors font-bold"
                >
                  Sign in
                </button>
                <button
                  onClick={openSignup}
                  className="hidden sm:inline-flex btn-primary !px-5 !py-2 !text-sm whitespace-nowrap"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 p-0.5 hover:ring-2 hover:ring-primary/40 transition-all overflow-hidden"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </button>
            )}

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden glass-strong rounded-2xl mt-2 p-4 flex flex-col gap-1">
            {links.map((l) =>
              l.to.includes("#") ? (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-bold"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm hover:bg-secondary/60 font-bold",
                    pathname === l.to ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              ),
            )}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/20">
              {!user ? (
                <>
                  <button 
                    onClick={openLogin}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-bold"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={openSignup}
                    className="w-full btn-primary !py-2.5 !text-sm"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setIsProfileOpen(true); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-bold"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={openSignup} 
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={openLogin} 
      />
      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
};


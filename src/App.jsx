import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Pricing from "./pages/Pricing";
import StrategyDetail from "./pages/StrategyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Referrals from "./pages/Referrals";
import CoinDetail from "./pages/CoinDetail";
import { Loader } from "./components/ui/Loader";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

import { ScrollToTop } from "./hooks/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Loader>
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-background">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 mix-blend-normal" />
          <div className="absolute inset-x-0 top-0 h-[80vh] glow-blob opacity-40 mix-blend-plus-lighter" />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] glow-blob-secondary opacity-30 mix-blend-plus-lighter" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<StrategyDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
          </Routes>
        </Router>
      </Loader>
    </ToastProvider>
  </AuthProvider>
);
}

export default App;

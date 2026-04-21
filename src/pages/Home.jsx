import { SiteNav } from "../components/SiteNav";
import { Hero } from "../components/home/Hero";
import { CoinSlider } from "../components/home/CoinSlider";
import { Features } from "../components/home/Features";
import { CryptoCoin } from "../components/home/CryptoCoin";
import { TopStats } from "../components/home/TopStats";
import { HowItWorks } from "../components/home/HowItWorks";
import { CTA } from "../components/home/CTA";
import { SiteFooter } from "../components/SiteFooter";
import { WelcomeModal } from "../components/Modal/WelcomeModal";

const Home = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <CoinSlider />
      <Features />
      <CryptoCoin />
      <TopStats />
      <HowItWorks />
      <CTA />
      <SiteFooter />
      <WelcomeModal />
    </main>
  );
};

export default Home;





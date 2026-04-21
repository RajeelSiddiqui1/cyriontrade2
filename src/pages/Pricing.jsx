import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingCompare } from "@/components/pricing/PricingCompare";
import { PricingTestimonials } from "@/components/pricing/PricingTestimonials";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PricingHero yearly={yearly} setYearly={setYearly} />
      <PricingPlans yearly={yearly} />
      <PricingCompare />
      <PricingTestimonials />
      <PricingFAQ />
      <PricingCTA />
      <SiteFooter />
    </main>
  );
};

export default Pricing;


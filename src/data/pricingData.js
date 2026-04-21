export const pricingData = {
  header: {
    title: "Choose Your Plan",
    subtitle: "Start trading smarter with CyrionTrade"
  },
  plans: [
    {
      id: "pioneer",
      name: "Pioneer",
      priceMonthly: "0",
      priceYearly: "0",
      description: "No payment required",
      features: [
        "Unlimited Copy Hero plans",
        "20 open positions / exchange",
        "Portfolio Management",
        "Free manual trading on all exchanges"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      id: "explorer",
      name: "Explorer",
      priceMonthly: "29",
      priceYearly: "24",
      description: "Everything from Pioneer +",
      features: [
        "80 open positions / exchange",
        "10 min strategy interval checks",
        "Scan markets with the power of 15 bots",
        "2 event-based triggers",
        "Backtesting",
        "Strategy Designer",
        "Paper (simulated) trading",
        "Trading signals (Signaler)"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      id: "adventurer",
      name: "Adventurer",
      priceMonthly: "69",
      priceYearly: "59",
      description: "Everything from Explorer +",
      features: [
        "200 open positions / exchange",
        "5 min strategy interval checks",
        "Scan markets with the power of 50 bots",
        "5 event-based triggers",
        "35 AI Arbitrations"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      id: "hero",
      name: "Hero",
      priceMonthly: "129",
      priceYearly: "109",
      description: "Everything from Adventurer +",
      features: [
        "500 open positions / exchange",
        "2 minute strategy interval checks",
        "Scan markets with the power of 75 bots",
        "10 event-based triggers",
        "All strategy scans in a single pass",
        "All coins for trading signals",
        "Market Making & Arbitrage",
        "Labor market real resources",
        "Unlimited Bots"
      ],
      cta: "Get Started",
      popular: false
    }
  ],
  comparison: {
    title: "Compare features",
    features: [
      { 
        name: "Manual Bot", 
        info: "Connect to all exchanges and trade manually for free. No automated trading features included",
        description: "Connect to all exchanges and trade manually for free. No automated trading features included. Perfect for traders who prefer full control over their trades.",
        pioneer: true, explorer: true, adventurer: true, hero: true 
      },
      { 
        name: "Copy Bot", 
        info: "Automatically copy trades from successful traders. Perfect for beginners who want to learn from experts",
        description: "Skip years of practice and copy another trader 1 on 1. Automatically replicate the trades of successful traders in real-time. Perfect for beginners who want to learn from experts while earning.",
        pioneer: true, explorer: true, adventurer: true, hero: true 
      },
      { 
        name: "Trading Bot", 
        info: "Automated trading bot with customizable strategies. Execute trades 24/7 based on your parameters",
        description: "Design trading strategies or follow trading signals and use automated selling features to increase your profits. Execute trades 24/7 based on your custom parameters and technical indicators.",
        pioneer: false, explorer: true, adventurer: true, hero: true 
      },
      { 
        name: "Market Making Bot", 
        info: "Provide liquidity to markets and earn from bid-ask spreads. Advanced strategy for experienced traders",
        description: "Profit on the spread of trading pairs. Provide liquidity to markets and earn from bid-ask spreads. Advanced strategy for experienced traders looking to maximize returns.",
        pioneer: false, explorer: false, adventurer: false, hero: true 
      },
      { 
        name: "Exchange Arbitrage Bot", 
        info: "Profit from price differences between exchanges. Automatically buy low on one exchange and sell high on another",
        description: "Profit from the price difference among exchanges. Automatically buy low on one exchange and sell high on another. Exploit market inefficiencies across multiple platforms.",
        pioneer: false, explorer: false, adventurer: false, hero: true 
      },
      { 
        name: "Triangular Arbitrage Bot", 
        info: "Exploit price differences between three currencies on the same exchange. Advanced arbitrage strategy",
        description: "Profit from discrepancies between three different currencies. Exploit price differences between three currencies on the same exchange. Advanced arbitrage strategy for maximum efficiency.",
        pioneer: false, explorer: false, adventurer: false, hero: true 
      },
    ]
  },
  testimonials: {
    title: "What successful traders say about CyrionTrade",
    items: [
      {
        name: "Richard Engel",
        rating: 5,
        text: "I enjoy working with this trading platform. It gives me peace of mind that I know that the hopper will take profit at the moments the price is right. Since crypto prices are very volatile, it...",
        linkText: "Read full review →"
      },
      {
        name: "Andrew Udi",
        rating: 5,
        text: "CYRIONTRADE. This is easily the focus for everyone interested in crypto bot. This trading bot has changed my life in so many ways. But why did I find it a great way to earn passive income online?",
        linkText: "Read full review →"
      },
      {
        name: "Doug Vankoppen",
        rating: 5,
        text: "CyrionTrade's Algo-Metric Intelligence (AMI) allows you to visualize, deploy and automate various trading strategies to appreciate the markets. It has lead to an exponential increase...",
        linkText: "Read full review →"
      },
      {
        name: "Daniel Bollinger",
        rating: 5,
        text: "I have been running CyrionTrade with a paid bot and strategy for over one year. And even in the solid market, I am up 40% for the year. Easy to use and lots of features...",
        linkText: "Read full review →"
      }
    ]
  },
  faqs: [
    {
      q: "How do I connect my exchange?",
      a: "We use institutional-grade read-only API keys. You generate these on your exchange and connect them securely to our platform. We never have withdrawal permissions."
    },
    {
      q: "What is 'Paper Trading'?",
      a: "Paper trading allows you to test any strategy with simulated capital in real-time market conditions. Perfect for learning before risking real money."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time without any hidden fees or long-term commitments."
    },
    {
      q: "Do you take profit commissions?",
      a: "No. Your profits are yours to keep. We only charge a flat subscription fee based on your chosen plan."
    }
  ]
};

export const plans = pricingData.plans;
export const comparison = pricingData.comparison;
export const testimonials = pricingData.testimonials;
export const header = pricingData.header;
export const faqs = pricingData.faqs;

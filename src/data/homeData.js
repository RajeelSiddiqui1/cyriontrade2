import {
  Bot,
  Activity,
  ShieldCheck,
  Network,
  Search,
  Link2,
  Rocket,
  TrendingUp,
  BarChart3,
  Lock,
} from "lucide-react";

export const heroChart = [
  { t: "00", v: 24 }, { t: "02", v: 28 }, { t: "04", v: 25 }, { t: "06", v: 32 },
  { t: "08", v: 38 }, { t: "10", v: 35 }, { t: "12", v: 44 }, { t: "14", v: 41 },
  { t: "16", v: 52 }, { t: "18", v: 48 }, { t: "20", v: 58 }, { t: "22", v: 64 },
];

export const tickerData = [
  { sym: "BTC/USDT", price: "67,432.10", chg: "+2.34%", up: true },
  { sym: "ETH/USDT", price: "3,521.88", chg: "+1.12%", up: true },
  { sym: "SOL/USDT", price: "184.42", chg: "-0.84%", up: false },
  { sym: "BNB/USDT", price: "612.05", chg: "+0.47%", up: true },
  { sym: "XRP/USDT", price: "0.5821", chg: "+3.21%", up: true },
  { sym: "ADA/USDT", price: "0.4612", chg: "-1.05%", up: false },
  { sym: "AVAX/USDT", price: "38.74", chg: "+2.88%", up: true },
  { sym: "LINK/USDT", price: "17.23", chg: "+0.92%", up: true },
];

export const features = [
  {
    icon: Bot,
    title: "Pre-Built Strategies",
    desc: "Access battle-tested strategies developed by professional traders with verified, on-chain track records.",
  },
  {
    icon: Activity,
    title: "Real-Time Performance",
    desc: "Monitor live PnL, drawdown, and Sharpe metrics. Adjust parameters on the fly without redeploying.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    desc: "Built-in stop-loss, position sizing and circuit breakers protect your capital under any market regime.",
  },
  {
    icon: Network,
    title: "Multi-Exchange Support",
    desc: "Trade Binance, Bybit, OKX, Kraken and Coinbase from a single dashboard with unified reporting.",
  },
];

export const steps = [
  { icon: Search, title: "Browse & Compare", desc: "Filter 80+ strategies by performance, risk, asset class and timeframe." },
  { icon: Link2, title: "Subscribe & Connect", desc: "Link your exchange via secure API keys. No withdrawal permissions required." },
  { icon: Rocket, title: "Activate & Monitor", desc: "Deploy in one click and track live performance from web or mobile." },
];

export const strategies = [
  { name: "Momentum Edge", pair: "BTC · ETH", perf: 24.5, risk: "Medium", price: 49, sharpe: 2.14, trades: 312, badge: "Popular" },
  { name: "Mean Reversion Pro", pair: "SOL · AVAX", perf: 18.2, risk: "Low", price: 39, sharpe: 1.92, trades: 248, badge: null },
  { name: "Grid Sentinel", pair: "BTC · USDT", perf: 12.8, risk: "Low", price: 29, sharpe: 1.71, trades: 1042, badge: null },
  { name: "Breakout Hunter", pair: "Top 20 Alts", perf: 41.7, risk: "High", price: 79, sharpe: 1.83, trades: 184, badge: "Premium" },
  { name: "Arbitrage Flow", pair: "Multi-Exchange", perf: 9.4, risk: "Low", price: 59, sharpe: 2.41, trades: 2891, badge: null },
  { name: "Volatility Harvester", pair: "ETH · SOL", perf: 31.2, risk: "Medium", price: 69, sharpe: 1.98, trades: 421, badge: "New" },
];

export const sparkData = (seed) =>
  Array.from({ length: 20 }, (_, i) => ({
    i,
    v: 50 + Math.sin(i * 0.6 + seed) * 10 + i * (seed % 3 === 0 ? 1.4 : 0.8),
  }));

export const testimonials = [
  {
    quote:
      "I replaced three custom bots with two CyrionTrade strategies and cut my dev time to zero. The risk controls are exactly what I needed.",
    name: "Marcus Chen",
    role: "Quant Trader, Hong Kong",
    result: "+18.4% in 60 days",
  },
  {
    quote:
      "Transparent metrics, real backtests, and live performance that matches. This is what trading SaaS should look like.",
    name: "Sofia Lindqvist",
    role: "Portfolio Manager",
    result: "Sharpe 2.1 sustained",
  },
  {
    quote:
      "Connected Binance and Bybit in five minutes. The grid strategy has been running flawlessly through three market cycles.",
    name: "Daniel Okafor",
    role: "Independent Trader",
    result: "+15% first month",
  },
];

export const plans = [
  { name: "Starter", price: 29, desc: "For traders exploring automation.", features: ["1 active strategy", "1 exchange", "Email support", "Basic analytics"] },
  { name: "Pro", price: 89, desc: "For active multi-strategy traders.", features: ["10 active strategies", "All exchanges", "Priority support", "Advanced analytics", "API access"], popular: true },
  { name: "Enterprise", price: 249, desc: "For funds and prop desks.", features: ["Unlimited strategies", "Dedicated infra", "24/7 SLA support", "Custom integrations", "White-glove onboarding"] },
];

export const categories = ["All", "Trend", "Mean Reversion", "Grid", "Arbitrage", "Breakout", "Scalping"];
export const risks = ["All", "Low", "Medium", "High"];
export const sorts = [
  { id: "perf", label: "Top performance" },
  { id: "sharpe", label: "Best Sharpe" },
  { id: "price-asc", label: "Price · Low to high" },
  { id: "price-desc", label: "Price · High to low" },
  { id: "trades", label: "Most trades" },
];

export const sparkData = (seed) =>
  Array.from({ length: 24 }, (_, i) => ({
    i,
    v: 50 + Math.sin(i * 0.5 + seed) * 9 + i * (seed % 3 === 0 ? 1.2 : 0.7),
  }));

export const strategies = [
  { id: "momentum-edge", name: "Momentum Edge", pair: "BTC · ETH", category: "Trend", perf: 24.5, risk: "Medium", price: 49, sharpe: 2.14, trades: 312, badge: "Popular", exchanges: ["Binance", "Bybit"] },
  { id: "mean-reversion-pro", name: "Mean Reversion Pro", pair: "SOL · AVAX", category: "Mean Reversion", perf: 18.2, risk: "Low", price: 39, sharpe: 1.92, trades: 248, badge: null, exchanges: ["Binance", "OKX"] },
  { id: "grid-sentinel", name: "Grid Sentinel", pair: "BTC · USDT", category: "Grid", perf: 12.8, risk: "Low", price: 29, sharpe: 1.71, trades: 1042, badge: null, exchanges: ["Binance"] },
  { id: "breakout-hunter", name: "Breakout Hunter", pair: "Top 20 Alts", category: "Breakout", perf: 41.7, risk: "High", price: 79, sharpe: 1.83, trades: 184, badge: "Premium", exchanges: ["Binance", "Kraken"] },
  { id: "arbitrage-flow", name: "Arbitrage Flow", pair: "Multi-Exchange", category: "Arbitrage", perf: 9.4, risk: "Low", price: 59, sharpe: 2.41, trades: 2891, badge: null, exchanges: ["Binance", "Kraken", "Bybit"] },
  { id: "volatility-harvester", name: "Volatility Harvester", pair: "ETH · SOL", category: "Scalping", perf: 31.2, risk: "Medium", price: 69, sharpe: 1.98, trades: 421, badge: "New", exchanges: ["Bybit", "OKX"] },
  { id: "trend-follower-x", name: "Trend Follower X", pair: "BTC · SOL", category: "Trend", perf: 28.1, risk: "High", price: 59, sharpe: 1.6, trades: 156, badge: null, exchanges: ["Binance", "Coinbase"] },
];

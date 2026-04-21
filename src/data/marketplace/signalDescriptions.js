// Signal descriptions for detail pages
export const SIGNAL_DESCRIPTIONS = {
  "tapoleon-signals": {
    title: "Tapoleon Signals",
    metrics: { frequency: 15, holdingTime: 2 },
    overview: `THE FUTURE OF SIGNAL TRADING

Tapoleon Signals provides high-precision, AI-driven entry and exit points for the most volatile crypto pairs. Designed for traders who demand performance and accuracy.

STRATEGY ENGINE

Our engine analyzes thousands of data points per second, including volume profiles, sentiment analysis, and order book depth to generate signals that stay ahead of the curve.

WHY CHOOSE TAPOLEON

- 24/7 Automated Signal Generation
- Multi-Exchange Support (Binance, ByBit, OKX)
- Advanced Risk Management Filters
- Real-time Notifications via CyrionTrade Dashboard

PERFORMANCE TRACKING

All signals are verified and logged. We maintain a transparent record of all historical performance to ensure you can trade with complete confidence.

DISCLAIMER

Trading involves risk. Tapoleon Signals aims for accuracy but does not guarantee profits. Always use stop losses and manage your capital responsibly.`,
  },
  "ultimat3strategy-revolver-scalper-signals-hands-off-auto-pilot": {
    title: "ULTIMAT3STRATEGY - REVOLVER SCALPER SIGNALS",
    metrics: { frequency: 14, holdingTime: 1 },
    overview: `SCALPING REVOLUTIONIZED

The Revolver Scalper is a high-frequency signal source designed to capture small, consistent price moves in rapid market conditions. Perfect for hands-off trading or auto-pilot setups.

KEY FEATURES

- Ultra-low latency signals
- Specialized in BTC and ETH scalping
- Optimized for leverage trading
- Dynamic take-profit levels

HOW IT WORKS

The Revolver algorithm identifies range-bound markets and breakout opportunities with surgical precision. By focusing on 1m and 5m timeframes, it generates multiple opportunities daily.

SETUP

Recommended to be used with the CyrionTrade High-Frequency Template for best results.`,
  },
  "munich-ai-set-and-forget-ultimate-all-exchanges": {
    title: "Munich-Ai Set and Forget Ultimate",
    metrics: { frequency: 5, holdingTime: 10 },
    overview: `ULTIMATE STABILITY

Munich-Ai is designed for the modern investor who prefers a "set and forget" approach. This signal source focuses on medium to long-term trends, reducing noise and emotional trading.

DIVERSITY

Supports all major exchanges and over 50 base currencies. Munich-Ai adapts to market shifts, switching between conservative and aggressive modes automatically.

STRENGTHS

- High win-to-loss ratio
- Low maintenance required
- Excellent for portfolio growth
- Built-in trend exhaustion detection`,
  },
  default: (title, category) => `This is a premium ${category.toLowerCase()} signal source.

DESCRIPTION

${title} offers advanced market analysis and real-time alerts. It is designed to integrate seamlessly with your CyrionTrade setup.

FEATURES

- High accuracy signals
- Multi-timeframe analysis
- Community verified performance

DISCLAIMER

Please paper trade before using live funds. Trading is risky.`
};

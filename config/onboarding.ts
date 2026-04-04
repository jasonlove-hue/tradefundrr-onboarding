export const platforms: Record<string, { id: string; title: string }[]> = {
  futures: [
    { id: "ninjatrader", title: "NinjaTrader" },
    { id: "tradovate", title: "Tradovate" },
    { id: "quantower", title: "Quantower" },
  ],
  stocks: [
    { id: "tradefundrr-web", title: "TradeFundrr Web Platform" },
  ],
};

export const tutorials: Record<string, string[]> = {
  ninjatrader: [
    "Download NinjaTrader from the official website",
    "Install and open the platform",
    "Enter your login credentials (sent via email)",
    "Connect to the correct server",
    "Confirm data feed is active",
  ],
  tradovate: [
    "Go to Tradovate login page",
    "Enter your credentials from TradeFundrr email",
    "Select the correct environment",
    "Open a chart to verify connection",
  ],
  quantower: [
    "Download Quantower platform",
    "Install and launch the app",
    "Add connection using your credentials",
    "Select your data provider",
    "Verify charts are loading",
  ],
  "tradefundrr-web": [
    "Open the TradeFundrr Web Platform",
    "Log in using your credentials",
    "Navigate to the dashboard",
    "Open a chart to begin trading",
  ],
};

export const credentialsConfig: Record<
  string,
  { id: string; label: string; value: string }[]
> = {
  ninjatrader: [
    { id: "server", label: "Server", value: "[Your Server]" },
    { id: "login", label: "Login", value: "[Your Login]" },
    { id: "password", label: "Password", value: "[Your Password]" },
  ],
  tradovate: [
    { id: "server", label: "Server", value: "[Your Server]" },
    { id: "login", label: "Login", value: "[Your Login]" },
    { id: "password", label: "Password", value: "[Your Password]" },
  ],
  quantower: [
    { id: "server", label: "Server", value: "[Your Server]" },
    { id: "login", label: "Login", value: "[Your Login]" },
    { id: "password", label: "Password", value: "[Your Password]" },
  ],
  "tradefundrr-web": [
    { id: "url", label: "Login URL", value: "[Your Login URL]" },
    { id: "email", label: "Email / Username", value: "[Your Email]" },
    { id: "password", label: "Password", value: "[Your Password]" },
  ],
};

export const rulesConfig: Record<string, string[]> = {
  futures: [
    "Follow all TradeFundrr futures account rules at all times.",
    "Monitor drawdown and daily loss limits carefully.",
    "Manage positions responsibly during volatile market conditions.",
    "You are responsible for complying with all platform and market data requirements.",
  ],
  stocks: [
    "Follow all TradeFundrr stocks account rules at all times.",
    "Monitor position risk and account limits carefully.",
    "Manage orders and positions responsibly during market volatility.",
    "You are responsible for complying with all platform requirements.",
  ],
};

export const assetClasses = [
  {
    id: "futures",
    title: "Futures",
    description:
      "Trade futures instruments using NinjaTrader, Tradovate, or Quantower",
  },
  {
    id: "stocks",
    title: "Stocks",
    description: "Trade stocks using the TradeFundrr Web Platform",
  },
];

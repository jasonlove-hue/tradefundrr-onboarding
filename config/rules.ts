export interface SummarySection {
  title: string;
  takeaway: string;
  items: string[];
}

export interface FullRulesSection {
  title: string;
  body: string[];
}

export interface RiskHighlight {
  title: string;
  text: string;
}

export interface AssetRules {
  title: string;
  lastUpdated: string;
  intro: string;
  riskHighlight: RiskHighlight;
  summarySections: SummarySection[];
  fullRules: FullRulesSection[];
  acknowledgment: string;
}

export const rulesContent: Record<string, AssetRules> = {
  futures: {
    title: "Futures Trading Rules",
    lastUpdated: "2026-04-04",
    intro:
      "Review these key rules before trading in your simulated futures account.",

    riskHighlight: {
      title: "Important to Know",
      text: "Profitable trades lasting 15 seconds or less may be removed from your account balance, and exceeding loss limits can result in account breach.",
    },

    summarySections: [
      {
        title: "Account Limits",
        takeaway: "Protect your account by staying within loss limits.",
        items: [
          "Account size: $50,000",
          "Daily loss limit: $1,000 (soft limit)",
          "Max end-of-day drawdown: $2,500 (hard breach)",
          "Drawdown follows a high-water mark",
        ],
      },
      {
        title: "Trading Rules",
        takeaway: "Trade responsibly and avoid restricted behaviors.",
        items: [
          "Maximum position size: 5 contracts (or 50 micros)",
          "News trading is allowed",
          "Scalping under 15 seconds is not permitted",
          "Trades that violate rules may be removed or adjusted",
        ],
      },
      {
        title: "Payout Requirements",
        takeaway: "Consistency matters more than one large trading day.",
        items: [
          "Minimum $250 profit across at least 5 non-consecutive trading days",
          "Profit target: $1,250 to unlock payouts",
          "If a single day exceeds 30% of the target, the target is recalculated",
        ],
      },
      {
        title: "Payout Terms",
        takeaway: "Understand how and when payouts are issued.",
        items: [
          "Profit split: 80/20",
          "Payouts are processed weekly",
          "Minimum payout: $250",
          "Maximum payout: $20,000",
        ],
      },
    ],

    fullRules: [
      {
        title: "Account Parameters",
        body: [
          "Account size is $50,000.",
          "Daily loss limit is $1,000 (soft-disable).",
          "Maximum end-of-day drawdown is $2,500 (hard breach).",
          "Drawdown is calculated using a high-water mark.",
        ],
      },
      {
        title: "Trading Restrictions",
        body: [
          "Maximum position size is 5 standard contracts or 50 micro contracts.",
          "News trading is allowed.",
          "Profitable trades lasting 15 seconds or less will be removed from the account balance.",
          "Trades that violate rules may be removed or adjusted.",
        ],
      },
      {
        title: "Payout Eligibility",
        body: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days.",
          "A total profit of at least $1,250 is required to qualify for payouts.",
          "If a trader exceeds 30% of the profit target in a single session, the profit target is recalculated.",
          "Example: If $600 is made in one session, the new target becomes $2,000.",
        ],
      },
      {
        title: "Payout Structure",
        body: [
          "Profit split is 80/20.",
          "Payouts are processed weekly.",
          "Minimum payout amount is $250.",
          "Maximum payout amount is $20,000.",
          "Maximum number of accounts per trader is 5.",
        ],
      },
    ],

    acknowledgment:
      "I understand and agree to follow these futures trading rules.",
  },

  stocks: {
    title: "Stocks Trading Rules",
    lastUpdated: "2026-04-04",
    intro:
      "Review these key rules before trading in your simulated stocks account.",

    riskHighlight: {
      title: "Important to Know",
      text: "Profitable trades lasting less than 30 seconds may be removed from your account balance, and exceeding loss limits can put your account at risk.",
    },

    summarySections: [
      {
        title: "Account Limits",
        takeaway: "Stay within risk limits to keep your account active.",
        items: [
          "Account size: $25,000",
          "Intraday buying power: $100,000",
          "Daily loss limit: $1,000",
          "Max end-of-day drawdown: $3,750",
          "Drawdown follows a high-water mark",
        ],
      },
      {
        title: "Trading Rules",
        takeaway: "Avoid restricted behaviors and trade responsibly.",
        items: [
          "Profitable trades under 30 seconds are not allowed",
          "All trades must follow TradeFundrr platform rules and execution requirements",
          "Trades that violate rules may be removed or adjusted",
        ],
      },
      {
        title: "Payout Eligibility",
        takeaway: "Consistency is required before payouts are unlocked.",
        items: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days",
          "A total profit of at least $1,250 is required to qualify for payouts",
          "If a trader exceeds 30% of the profit target in a single session, the profit target is recalculated",
          "Example: If $600 is made in one session, the new target becomes $2,000",
        ],
      },
      {
        title: "Payout Terms",
        takeaway: "Understand how and when payouts are issued.",
        items: [
          "Profit split: 80/20",
          "Payouts are processed weekly",
          "Minimum payout: $250",
          "Maximum payout: $15,000",
        ],
      },
    ],

    fullRules: [
      {
        title: "Account Parameters",
        body: [
          "Account size is $25,000.",
          "Intraday buying power is $100,000.",
          "Daily loss limit is $1,000.",
          "Maximum end-of-day drawdown is $3,750.",
          "Drawdown is calculated using a high-water mark.",
        ],
      },
      {
        title: "Trading Restrictions",
        body: [
          "Profitable trades lasting less than 30 seconds will be removed from the account balance.",
          "All trading must follow TradeFundrr platform rules and execution requirements.",
          "Trades that violate rules may be removed or adjusted.",
        ],
      },
      {
        title: "Payout Eligibility",
        body: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days.",
          "A total profit of at least $1,250 is required to qualify for payouts.",
          "If a trader exceeds 30% of the profit target in a single session, the profit target is recalculated.",
          "Example: If $600 is made in one session, the new target becomes $2,000.",
        ],
      },
      {
        title: "Payout Structure",
        body: [
          "Profit split is 80/20.",
          "Payouts are processed weekly.",
          "Minimum payout amount is $250.",
          "Maximum payout amount is $15,000.",
        ],
      },
    ],

    acknowledgment:
      "I understand and agree to follow these stocks trading rules.",
  },

  "options-incubator": {
    title: "Options Incubator Trading Rules",
    lastUpdated: "2026-04-04",
    intro:
      "Review these key rules before trading in your simulated options incubator account.",

    riskHighlight: {
      title: "Important to Know",
      text: "Trades held for 30 seconds or less are flagged, and profitable trades in that window may be removed from the account balance.",
    },

    summarySections: [
      {
        title: "Account Limits",
        takeaway: "Stay within risk limits to keep your account active.",
        items: [
          "Account size: $25,000",
          "Daily loss limit: $1,000",
          "Max end-of-day drawdown: $3,750",
          "Weekly payouts unlocked at $1,250 profit target",
          "Drawdown high-water mark: $25,000",
        ],
      },
      {
        title: "Drawdown Rules",
        takeaway:
          "Understand how your trailing drawdown behaves over time.",
        items: [
          "Once trailing drawdown matches your initial balance, it stops trailing",
          "The drawdown is then locked at that level for the duration of the evaluation",
          "This can create more flexibility in managing trades once a cushion is established",
        ],
      },
      {
        title: "Trading Rules",
        takeaway:
          "Avoid restricted behavior and follow platform execution rules.",
        items: [
          "Trades held for 30 seconds or less are flagged, and if profitable, they will be removed from the account balance",
          "All trading must follow TradeFundrr platform rules and execution requirements",
        ],
      },
      {
        title: "Payout Eligibility",
        takeaway:
          "Consistency is required before payouts are unlocked.",
        items: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days",
          "A total profit of at least $1,250 is required to qualify for payouts",
        ],
      },
      {
        title: "Payout Terms",
        takeaway: "Understand how and when payouts are issued.",
        items: [
          "Profit split: 80/20",
          "Payout cycle: Weekly",
          "Minimum payout amount: $250",
          "Maximum payout amount: $15,000",
        ],
      },
    ],

    fullRules: [
      {
        title: "Account Parameters",
        body: [
          "Account size is $25,000.",
          "Daily loss limit is $1,000.",
          "Maximum end-of-day drawdown is $3,750.",
          "Weekly payouts unlock at a $1,250 profit target.",
          "Drawdown high-water mark is $25,000.",
        ],
      },
      {
        title: "Drawdown High-Water Mark",
        body: [
          "Once your trailing drawdown matches your initial balance, it will no longer trail and will be locked in at that level for the duration of the evaluation.",
          "This allows you to establish a cushion and enjoy a higher maximum drawdown, providing greater flexibility in managing your trades.",
        ],
      },
      {
        title: "Trading Restrictions",
        body: [
          "If a trade is held for 30 seconds or less, it will be flagged on your dashboard, and if it was profitable, it will be removed from the account balance.",
          "If the trade is a complex strategy, please notify support@tradefundrr.com.",
          "All trading must follow TradeFundrr platform rules and execution requirements.",
        ],
      },
      {
        title: "Payout Eligibility",
        body: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days.",
          "A total profit of at least $1,250 is required to qualify for payouts.",
        ],
      },
      {
        title: "Payout Structure",
        body: [
          "Profit split is 80/20.",
          "Payout cycle is weekly.",
          "Minimum payout amount is $250.",
          "Maximum payout amount is $15,000.",
        ],
      },
    ],

    acknowledgment:
      "I understand and agree to follow these options incubator trading rules.",
  },

  "options-instant-funding": {
    title: "Options Instant Funding Trading Rules",
    lastUpdated: "2026-04-04",
    intro:
      "Review these key rules before trading in your simulated options instant funding account.",

    riskHighlight: {
      title: "Important to Know",
      text: "Trades held for 30 seconds or less are flagged, and profitable trades in that window may be removed from the account balance.",
    },

    summarySections: [
      {
        title: "Account Limits",
        takeaway: "Stay within risk limits to keep your account active.",
        items: [
          "Account size: $25,000",
          "Daily loss limit: $1,000",
          "Max end-of-day drawdown: $3,750",
          "Weekly payouts unlocked at $1,250 profit target",
          "Drawdown high-water mark: $25,000",
        ],
      },
      {
        title: "Trading Rules",
        takeaway:
          "Avoid restricted behavior and follow platform execution rules.",
        items: [
          "Trades held for 30 seconds or less are flagged, and if profitable, they will be removed from the account balance",
          "All trading must follow TradeFundrr platform rules and execution requirements",
        ],
      },
      {
        title: "Payout Eligibility",
        takeaway:
          "Consistency is required before payouts are unlocked.",
        items: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days",
          "A total profit of at least $1,250 is required to qualify for payouts",
        ],
      },
      {
        title: "Payout Terms",
        takeaway: "Understand how and when payouts are issued.",
        items: [
          "Profit split: 80/20",
          "Payout cycle: Weekly",
          "Minimum payout amount: $250",
          "Maximum payout amount: $15,000",
        ],
      },
    ],

    fullRules: [
      {
        title: "Account Parameters",
        body: [
          "Account size is $25,000.",
          "Daily loss limit is $1,000.",
          "Maximum end-of-day drawdown is $3,750.",
          "Weekly payouts unlock at a $1,250 profit target.",
          "Drawdown high-water mark is $25,000.",
        ],
      },
      {
        title: "Trading Restrictions",
        body: [
          "If a trade is held for 30 seconds or less, it will be flagged on your dashboard, and if it was profitable, it will be removed from the account balance.",
          "If the trade is a complex strategy, please notify support@tradefundrr.com.",
          "All trading must follow TradeFundrr platform rules and execution requirements.",
        ],
      },
      {
        title: "Payout Eligibility",
        body: [
          "At least $250 profit must be achieved over a minimum of 5 non-consecutive trading days.",
          "A total profit of at least $1,250 is required to qualify for payouts.",
        ],
      },
      {
        title: "Payout Structure",
        body: [
          "Profit split is 80/20.",
          "Payout cycle is weekly.",
          "Minimum payout amount is $250.",
          "Maximum payout amount is $15,000.",
        ],
      },
    ],

    acknowledgment:
      "I understand and agree to follow these options instant funding trading rules.",
  },
};

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding, OnboardingData } from "@/lib/storage";
import { platforms } from "@/config/onboarding";

function getPlatformTitle(platformId: string): string {
  for (const group of Object.values(platforms)) {
    const match = group.find((p) => p.id === platformId);
    if (match) return match.title;
  }
  return platformId;
}

export default function Complete() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const saved = getOnboarding();
    if (!saved || !saved.platform || !saved.rulesAccepted) {
      router.push("/");
      return;
    }
    setData(saved);
  }, [router]);

  if (!data) return null;

  const platformTitle = getPlatformTitle(data.platform!);

  return (
    <div className="tf-page">
      <div className="w-full max-w-lg">
        <div className="tf-card p-10 text-center">
          <h1 className="text-3xl text-tf-text">
            You're Ready to Trade
          </h1>

          <div className="mt-8 rounded-xl bg-tf-bg p-5 text-left">
            <p className="text-sm font-semibold text-tf-muted">
              You're ready to trade:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2 text-sm text-tf-muted">
                <span className="tf-badge-success">✓</span>
                Platform selected — {platformTitle}
              </li>
              <li className="flex items-center gap-2 text-sm text-tf-muted">
                <span className="tf-badge-success">✓</span>
                Setup steps completed
              </li>
              <li className="flex items-center gap-2 text-sm text-tf-muted">
                <span className="tf-badge-success">✓</span>
                Rules acknowledged
              </li>
            </ul>
          </div>

          {/* How Progression Works */}
          <div className="mt-8 rounded-xl border border-tf-border bg-tf-surface/50 p-6 text-left">
            <h2 className="font-heading text-base font-semibold text-tf-text">
              How Progression to a Live Trading Account Works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-tf-muted/80">
              Our goal is to identify traders who demonstrate consistent
              performance and strong risk management. Based on this, traders may
              be considered for progression to a live trading environment over
              time. Progression is not guaranteed and depends on overall account
              performance and discipline.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2 text-sm text-tf-subtle">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tf-subtle/60" />
                Consistency matters more than any single trade.
              </li>
              <li className="flex items-start gap-2 text-sm text-tf-subtle">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tf-subtle/60" />
                Risk management is a key part of long-term evaluation.
              </li>
              <li className="flex items-start gap-2 text-sm text-tf-subtle">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-tf-subtle/60" />
                Progression decisions are based on overall account behavior.
              </li>
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href="https://dashboard.tradefundrr.com/Client"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-tf-primary px-6 py-4 text-left transition-colors hover:bg-tf-primary-hover"
            >
              <span className="text-base font-medium text-white">
                Open Trader Dashboard
              </span>
              <span className="mt-1 block text-sm text-white/60">
                Manage your account, credentials, and progress.
              </span>
            </a>
            <a
              href="https://tradefundrr.freshdesk.com/support/home"
              target="_blank"
              rel="noopener noreferrer"
              className="tf-button-secondary"
            >
              <span className="text-base font-medium text-tf-text">
                View Setup Help / FAQ
              </span>
              <span className="mt-1 block text-sm text-tf-subtle">
                Get help if you run into setup issues.
              </span>
            </a>
            <a
              href="https://tradefundrr.freshdesk.com/support/solutions/202000025155"
              target="_blank"
              rel="noopener noreferrer"
              className="tf-button-secondary"
            >
              <span className="text-base font-medium text-tf-text">
                Helpdesk Video Guides
              </span>
              <span className="mt-1 block text-sm text-tf-subtle">
                Watch setup walkthroughs and platform help videos.
              </span>
            </a>
            <a
              href="https://www.youtube.com/@tradefundrr/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="tf-button-secondary"
            >
              <span className="text-base font-medium text-tf-text">
                YouTube Video Tutorials
              </span>
              <span className="mt-1 block text-sm text-tf-subtle">
                Browse TradeFundrr video tutorials on YouTube.
              </span>
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-tf-subtle">
          Need help later? You can access guides anytime from your dashboard.
        </p>
        <p className="mt-3 text-center text-xs text-tf-subtle/70">
          Trading involves risk. Make sure you understand all program rules
          before trading.
        </p>
      </div>
    </div>
  );
}

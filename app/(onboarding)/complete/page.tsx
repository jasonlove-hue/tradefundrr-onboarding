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
  const [showVideos, setShowVideos] = useState(false);

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

          <div className="mt-8 space-y-3">
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

        {/* Optional video support section */}
        <div className="mt-6 rounded-xl border border-tf-border bg-tf-surface">
          <button
            onClick={() => setShowVideos(!showVideos)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
          >
            <div>
              <p className="text-sm font-semibold text-tf-text">
                Need help getting started?
              </p>
              <p className="mt-0.5 text-xs text-tf-subtle">
                Watch setup walkthroughs and platform help videos.
              </p>
            </div>
            <span className="ml-4 text-sm font-medium text-tf-accent">
              {showVideos ? "Hide" : "Watch"}
            </span>
          </button>

          {showVideos && (
            <div className="border-t border-tf-border px-6 pb-6 pt-4">
              <div className="overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLxYour_Playlist_ID"
                  title="TradeFundrr Setup Guides"
                  className="aspect-video w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-center text-xs text-tf-subtle">
                Visit{" "}
                <a
                  href="https://www.youtube.com/@tradefundrr/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tf-accent hover:underline"
                >
                  TradeFundrr on YouTube
                </a>{" "}
                for more tutorials.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-tf-subtle">
          You can revisit this setup anytime from your dashboard.
        </p>
      </div>
    </div>
  );
}

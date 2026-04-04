"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding } from "@/lib/storage";
import { platforms } from "@/config/onboarding";

function getPlatformTitle(platformId: string): string {
  for (const group of Object.values(platforms)) {
    const match = group.find((p) => p.id === platformId);
    if (match) return match.title;
  }
  return platformId;
}

export default function Credentials() {
  const router = useRouter();
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    const data = getOnboarding();
    if (!data || !data.platform) {
      router.push("/");
      return;
    }
    setPlatform(data.platform);
  }, [router]);

  if (!platform) return null;

  const title = getPlatformTitle(platform);

  return (
    <div className="tf-page">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl text-tf-text">
            Your Credentials
          </h1>
          <p className="mt-3 text-lg text-tf-muted">
            Credentials for{" "}
            <span className="font-semibold text-tf-accent">{title}</span>
          </p>
          <p className="mt-2 text-sm text-tf-subtle">
            You'll receive real credentials via email or dashboard.
          </p>
        </div>

        <div className="tf-card mt-10 p-8 text-center">
          <p className="text-lg font-medium text-tf-text">
            We've sent your login details to your email.
          </p>

          <div className="mt-6 text-left">
            <p className="text-sm font-medium text-tf-muted">
              Check your inbox for:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-3 text-sm text-tf-muted">
                <span className="tf-badge-accent mt-0.5 flex h-5 w-5 shrink-0 text-xs">
                  1
                </span>
                Your username and password
              </li>
              <li className="flex items-start gap-3 text-sm text-tf-muted">
                <span className="tf-badge-accent mt-0.5 flex h-5 w-5 shrink-0 text-xs">
                  2
                </span>
                A link to access your TradeFundrr dashboard
              </li>
              <li className="flex items-start gap-3 text-sm text-tf-muted">
                <span className="tf-badge-accent mt-0.5 flex h-5 w-5 shrink-0 text-xs">
                  3
                </span>
                Instructions to get started
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm text-tf-subtle">
            If you don't see it, check your spam or promotions folder.
          </p>
        </div>

        <div className="tf-disclaimer mt-8">
          <p className="text-sm text-tf-accent">
            These credentials are for your TradeFundrr simulated trading
            account.
          </p>
          <p className="mt-2 text-sm text-tf-muted">
            They are not for a live brokerage account.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="https://dashboard.tradefundrr.com/Client"
            target="_blank"
            rel="noopener noreferrer"
            className="tf-button-primary"
          >
            Open Dashboard
          </a>
          <p className="text-xs text-tf-subtle">
            Next: Trading Rules
          </p>
          <button
            onClick={() => router.push("/rules")}
            className="rounded-lg border border-tf-border bg-transparent px-6 py-3 text-base font-medium text-tf-muted transition-colors duration-200 ease-out hover:border-tf-primary hover:text-tf-text"
          >
            I've Checked My Email
          </button>
        </div>
      </div>
    </div>
  );
}

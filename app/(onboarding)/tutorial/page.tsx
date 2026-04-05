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

export default function Tutorial() {
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

  return (
    <div className="tf-page">
      <div className="tf-card w-full max-w-lg p-10 text-center">
        <h1 className="text-3xl text-tf-text">Your Account Is Ready</h1>
        <p className="mt-4 text-tf-muted">
          Your simulated trading account has been created. You can view it
          anytime from your TradeFundrr dashboard.
        </p>

        <button
          onClick={() => router.push("/credentials")}
          className="tf-button-primary mt-8"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

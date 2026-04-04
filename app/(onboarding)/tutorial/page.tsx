"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding } from "@/lib/storage";
import { platforms, tutorials } from "@/config/onboarding";

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

  const steps = tutorials[platform] || [];
  const title = getPlatformTitle(platform);

  return (
    <div className="tf-page">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl text-tf-text">
            Platform Setup
          </h1>
          <p className="mt-3 text-lg text-tf-muted">
            Follow these steps to set up{" "}
            <span className="font-semibold text-tf-accent">{title}</span>
          </p>
          <p className="mt-2 text-sm text-tf-subtle">
            This usually takes less than 5 minutes.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="tf-card flex items-start gap-4 p-5"
            >
              <span className="tf-badge-accent flex h-8 w-8 text-sm">
                {index + 1}
              </span>
              <p className="pt-1 text-tf-muted">{step}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-tf-subtle">
          Next: Your Credentials
        </p>
        <div className="mt-3 text-center">
          <button
            onClick={() => router.push("/credentials")}
            className="tf-button-primary"
          >
            I've Completed This
          </button>
        </div>
      </div>
    </div>
  );
}

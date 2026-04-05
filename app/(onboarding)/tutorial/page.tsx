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
            Access {title}
          </h1>
          <p className="mt-3 text-tf-muted">
            Use your dashboard and email credentials to access{" "}
            <span className="font-semibold text-tf-accent">{title}</span> and
            confirm everything is working.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="tf-card flex items-start gap-4 px-5 py-4"
            >
              <span className="tf-badge-accent flex h-6 w-6 shrink-0 text-xs">
                {index + 1}
              </span>
              <p className="text-sm text-tf-muted">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/credentials")}
            className="tf-button-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

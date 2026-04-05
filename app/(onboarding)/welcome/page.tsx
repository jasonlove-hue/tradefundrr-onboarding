"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding } from "@/lib/storage";

export default function Welcome() {
  const router = useRouter();
  const [assetClass, setAssetClass] = useState<string | null>(null);

  useEffect(() => {
    const data = getOnboarding();
    if (!data) {
      router.push("/");
      return;
    }
    setAssetClass(data.assetClass);
  }, [router]);

  if (!assetClass) return null;

  return (
    <div className="tf-page">
      <div className="tf-card w-full max-w-lg p-10 text-center">
        <h1 className="text-3xl text-tf-text">You're In</h1>

        <p className="mt-4 text-lg text-tf-muted">
          Asset Class:{" "}
          <span className="font-semibold capitalize text-tf-accent">
            {assetClass}
          </span>
        </p>

        <p className="mt-4 text-tf-subtle">
          Let's walk you through a few quick details before you start trading.
        </p>

        <button
          onClick={() => router.push("/platform")}
          className="tf-button-primary mt-8"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

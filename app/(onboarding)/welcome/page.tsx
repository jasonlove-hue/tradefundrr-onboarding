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
        <h1 className="text-3xl text-tf-text">
          Welcome to TradeFundrr
        </h1>

        <p className="mt-4 text-lg text-tf-muted">
          You selected:{" "}
          <span className="font-semibold capitalize text-tf-accent">
            {assetClass}
          </span>
        </p>

        <p className="mt-6 text-tf-muted">
          We'll guide you through platform setup, credentials, and trading
          rules.
        </p>

        <p className="mt-2 text-sm text-tf-subtle">
          This will only take a few minutes.
        </p>

        <p className="mt-6 text-xs text-tf-subtle">
          Next: Platform Selection
        </p>

        <button
          onClick={() => router.push("/platform")}
          className="tf-button-primary mt-4"
        >
          Start Setup
        </button>
      </div>
    </div>
  );
}

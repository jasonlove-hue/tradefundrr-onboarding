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
          You're in. Let's get you set up.
        </h1>

        <p className="mt-4 text-lg text-tf-muted">
          Asset Class:{" "}
          <span className="font-semibold capitalize text-tf-accent">
            {assetClass}
          </span>
        </p>

        <p className="mt-4 text-tf-subtle">
          This takes just a couple minutes. We'll walk you through everything.
        </p>

        <button
          onClick={() => router.push("/platform")}
          className="tf-button-primary mt-8"
        >
          Start Setup
        </button>
      </div>
    </div>
  );
}

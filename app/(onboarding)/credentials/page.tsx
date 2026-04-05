"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding } from "@/lib/storage";

export default function Credentials() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = getOnboarding();
    if (!data || !data.platform) {
      router.push("/");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="tf-page">
      <div className="tf-card w-full max-w-lg p-10 text-center">
        <h1 className="text-3xl text-tf-text">Login Details Sent</h1>
        <p className="mt-4 text-tf-muted">
          Your credentials and dashboard link have been sent to your email.
        </p>
        <p className="mt-3 text-sm text-tf-subtle">
          Next, review the trading rules and risk limits required before you can
          start trading.
        </p>

        <button
          onClick={() => router.push("/rules")}
          className="tf-button-primary mt-8"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

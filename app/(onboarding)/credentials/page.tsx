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
        <h1 className="text-3xl text-tf-text">Your Account Is Ready</h1>
        <p className="mt-4 text-tf-muted">
          Your login details and dashboard access have been sent to your email.
        </p>
        <p className="mt-3 text-sm text-tf-subtle">
          Next, we'll review the key rules, risk parameters, and show you where
          to access FAQs and video tutorials.
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

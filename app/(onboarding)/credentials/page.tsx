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
        <h1 className="text-3xl text-tf-text">Credentials Sent</h1>
        <p className="mt-4 text-tf-muted">
          Your login details have been sent to your email. You'll use them to
          access your dashboard and platform.
        </p>
        <p className="mt-2 text-sm text-tf-subtle">
          Don't see them? Check your spam or promotions folder.
        </p>

        <div className="mt-6 space-y-1 text-xs text-tf-subtle">
          <p>Step 1: Check your email for credentials</p>
          <p>Step 2: Open your dashboard and log in</p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => router.push("/rules")}
            className="tf-button-primary"
          >
            Check Your Email
          </button>
          <a
            href="https://dashboard.tradefundrr.com/Client"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-tf-border bg-transparent px-6 py-3 text-base font-medium text-tf-muted transition-colors duration-200 ease-out hover:border-tf-primary hover:text-tf-text"
          >
            Open Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

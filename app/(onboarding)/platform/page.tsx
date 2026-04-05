"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding, saveOnboarding } from "@/lib/storage";
import { platforms, optionsPrograms } from "@/config/onboarding";

function getPlatformTitle(platformId: string): string {
  for (const group of Object.values(platforms)) {
    const match = group.find((p) => p.id === platformId);
    if (match) return match.title;
  }
  return platformId;
}

export default function Platform() {
  const router = useRouter();
  const [assetClass, setAssetClass] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [existingPlatform, setExistingPlatform] = useState<string | null>(null);

  useEffect(() => {
    const data = getOnboarding();
    if (!data) {
      router.push("/");
      return;
    }
    setAssetClass(data.assetClass);
    if (data.optionsProgram) {
      setSelectedProgram(data.optionsProgram);
    }
    if (data.platform) {
      setExistingPlatform(data.platform);
    }
  }, [router]);

  function handleContinue(platformId: string) {
    const data = getOnboarding();
    if (!data) return;
    saveOnboarding({ ...data, platform: platformId });
    router.push("/tutorial");
  }

  function handleProgramSelect(programId: string) {
    const data = getOnboarding();
    if (!data) return;
    saveOnboarding({
      ...data,
      optionsProgram: programId as "incubator" | "instant-funding",
    });
    setSelectedProgram(programId);
  }

  if (!assetClass) return null;

  // Stocks: confirmation
  if (assetClass === "stocks") {
    return (
      <div className="tf-page">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-3xl text-tf-text">
            How You'll Access Your Platform
          </h1>
          <p className="mt-4 text-tf-muted">
            Your account is already set up and ready to use.
          </p>
          <p className="mt-2 text-tf-muted">You'll be trading on:</p>

          <div className="tf-card mt-6 p-8 text-left">
            <h2 className="font-heading text-lg font-semibold text-tf-text">
              TradeFundrr Web Platform
            </h2>
            <p className="mt-2 text-sm text-tf-subtle">
              Access your account directly from your browser. No download
              required.
            </p>
          </div>

          <button
            onClick={() => handleContinue("tradefundrr-web")}
            className="tf-button-primary mt-8"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Options: two-phase (program selection → platform confirmation)
  if (assetClass === "options") {
    if (!selectedProgram) {
      return (
        <div className="tf-page">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-3xl text-tf-text">Select Your Program</h1>
            <p className="mt-3 text-lg text-tf-muted">
              Choose your options program to continue.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {optionsPrograms.map((program) => (
                <button
                  key={program.id}
                  onClick={() => handleProgramSelect(program.id)}
                  className="tf-card-interactive p-8 text-left shadow-[0_1px_3px_rgba(0,0,0,0.3)] translate-y-0 transition-all duration-200 ease-out hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(0,69,224,0.15)] hover:border-tf-primary focus:outline-none focus:border-tf-primary focus:shadow-[0_0_0_2px_#0045E0,0_0_20px_rgba(0,69,224,0.25)]"
                >
                  <h2 className="text-xl font-semibold text-tf-text">
                    {program.title}
                  </h2>
                  <p className="mt-2 text-sm text-tf-muted">
                    {program.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="tf-page">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-3xl text-tf-text">
            How You'll Access Your Platform
          </h1>
          <p className="mt-4 text-tf-muted">
            Your account is already set up and ready to use.
          </p>
          <p className="mt-2 text-tf-muted">You'll be trading on:</p>

          <div className="tf-card mt-6 p-8 text-left">
            <h2 className="font-heading text-lg font-semibold text-tf-text">
              DX Trade with DX Feed
            </h2>
            <p className="mt-2 text-sm text-tf-subtle">
              Access your platform directly from your TradeFundrr dashboard.
            </p>
          </div>

          <button
            onClick={() => handleContinue("dxtrade")}
            className="tf-button-primary mt-8"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Futures: confirmation only, platform was selected during purchase
  const futuresPlatformId = existingPlatform || platforms.futures?.[0]?.id || "ninjatrader";

  return (
    <div className="tf-page">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl text-tf-text">
          How You'll Access Your Platform
        </h1>
        <p className="mt-4 text-tf-muted">
          Your platform was selected during purchase. You'll access it from
          your dashboard or desktop application.
        </p>

        <p className="mt-4 text-sm font-medium text-amber-400">
          Once trading begins, your platform cannot be changed.
        </p>

        <button
          onClick={() => handleContinue(futuresPlatformId)}
          className="tf-button-primary mt-8"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

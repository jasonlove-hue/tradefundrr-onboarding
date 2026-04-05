"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding, saveOnboarding } from "@/lib/storage";
import { platforms, optionsPrograms } from "@/config/onboarding";

export default function Platform() {
  const router = useRouter();
  const [assetClass, setAssetClass] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

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
  }, [router]);

  function handleSelect(platformId: string) {
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

  // Stocks: single platform confirmation
  if (assetClass === "stocks") {
    return (
      <div className="tf-page">
        <div className="tf-card w-full max-w-lg p-10 text-center">
          <h1 className="text-3xl text-tf-text">Platform Setup</h1>
          <p className="mt-4 text-lg text-tf-muted">
            Your platform is{" "}
            <span className="font-semibold text-tf-accent">
              TradeFundrr Web Platform
            </span>
          </p>
          <p className="mt-4 text-tf-subtle">
            No download required — accessible from any browser.
          </p>
          <button
            onClick={() => handleSelect("tradefundrr-web")}
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
    // Phase 1: Program selection
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

    // Phase 2: DX Trade confirmation
    return (
      <div className="tf-page">
        <div className="tf-card w-full max-w-lg p-10 text-center">
          <h1 className="text-3xl text-tf-text">Platform Setup</h1>
          <p className="mt-4 text-lg text-tf-muted">
            Your platform is{" "}
            <span className="font-semibold text-tf-accent">
              DX Trade
            </span>{" "}
            with{" "}
            <span className="font-semibold text-tf-accent">DX Feed</span>
          </p>
          <p className="mt-4 text-tf-subtle">
            Access DX Trade directly from your TradeFundrr dashboard.
          </p>
          <button
            onClick={() => handleSelect("dxtrade")}
            className="tf-button-primary mt-8"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Futures: multi-platform grid
  const platformOptions = platforms[assetClass] || [];

  return (
    <div className="tf-page">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl text-tf-text">Platform Setup</h1>
        <p className="mt-3 text-lg text-tf-muted">
          Select your trading platform to continue.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {platformOptions.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handleSelect(platform.id)}
              className="tf-card-interactive p-8 text-left shadow-[0_1px_3px_rgba(0,0,0,0.3)] translate-y-0 transition-all duration-200 ease-out hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(0,69,224,0.15)] hover:border-tf-primary focus:outline-none focus:border-tf-primary focus:shadow-[0_0_0_2px_#0045E0,0_0_20px_rgba(0,69,224,0.25)]"
            >
              <h2 className="text-xl font-semibold text-tf-text">
                {platform.title}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

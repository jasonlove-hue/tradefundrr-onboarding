"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { assetClasses } from "@/config/onboarding";
import { saveOnboarding } from "@/lib/storage";

export default function AssetClassSelection() {
  const router = useRouter();

  function handleSelect(id: string) {
    saveOnboarding({ assetClass: id as "futures" | "stocks" | "options" });
    router.push("/welcome");
  }

  return (
    <div className="tf-page">
      <div className="w-full max-w-2xl text-center">
        <Image
          src="/tf-logo-dark.png"
          alt="TradeFundrr"
          width={160}
          height={43}
          className="mx-auto mb-8 opacity-90"
          priority
        />
        <h1 className="text-3xl text-tf-text">
          Continue Your Setup
        </h1>
        <p className="mt-3 text-lg text-tf-muted">
          Select your asset class to continue your onboarding.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {assetClasses.map((asset) => (
            <button
              key={asset.id}
              onClick={() => handleSelect(asset.id)}
              className="tf-card-interactive p-8 text-left shadow-[0_1px_3px_rgba(0,0,0,0.3)] translate-y-0 transition-all duration-200 ease-out hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(0,69,224,0.15)] hover:border-tf-primary focus:outline-none focus:border-tf-primary focus:shadow-[0_0_0_2px_#0045E0,0_0_20px_rgba(0,69,224,0.25)]"
            >
              <h2 className="text-xl font-semibold text-tf-text">
                {asset.title}
              </h2>
              <p className="mt-2 text-sm text-tf-muted">
                {asset.description}
              </p>
            </button>
          ))}
        </div>

        <p className="mt-6 text-xs text-tf-subtle">
          Not sure? Check your confirmation email for your selected program.
        </p>
      </div>
    </div>
  );
}

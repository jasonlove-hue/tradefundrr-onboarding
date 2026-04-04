"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCompletedStep } from "@/lib/storage";

const steps = [
  { label: "Asset Selection", description: "Choose what you want to trade" },
  { label: "Welcome", description: "Overview of your onboarding" },
  { label: "Platform", description: "Pick your trading platform" },
  { label: "Tutorial", description: "Step-by-step platform setup" },
  { label: "Credentials", description: "Your login details" },
  { label: "Rules", description: "Review trading rules" },
  { label: "Complete", description: "You're ready to trade" },
];

const stepPaths = ["/", "/welcome", "/platform", "/tutorial", "/credentials", "/rules", "/complete"];

export default function StepperLayout({
  currentStep,
  children,
}: {
  currentStep: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [completedStep, setCompletedStep] = useState(-1);

  useEffect(() => {
    setCompletedStep(getCompletedStep());
  }, [currentStep]);

  function handleStepClick(index: number) {
    if (index <= completedStep) {
      router.push(stepPaths[index]);
    }
  }

  const progressPercent = (currentStep / 6) * 100;

  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      {/* Desktop sidebar */}
      <nav className="hidden w-64 shrink-0 flex-col border-r border-tf-border bg-tf-surface lg:flex">
        <div className="border-b border-tf-border px-6 py-5">
          <Image
            src="/tf-logo-dark.png"
            alt="TradeFundrr"
            width={120}
            height={32}
            className="opacity-90"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
        <ol className="flex-1 space-y-1">
          {steps.map((step, index) => {
            const isCompleted = index <= completedStep && index !== currentStep;
            const isCurrent = index === currentStep;
            const isFuture = index > completedStep && !isCurrent;

            return (
              <li key={index}>
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={isFuture}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isCurrent
                      ? "bg-tf-primary/10 text-tf-text"
                      : isCompleted
                        ? "cursor-pointer text-tf-muted hover:bg-white/5"
                        : "cursor-not-allowed text-tf-subtle/50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isCurrent
                        ? "bg-tf-primary text-white"
                        : isCompleted
                          ? "bg-tf-success/15 text-tf-success"
                          : "bg-tf-border text-tf-subtle"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <div className="min-w-0">
                    <span className={isCurrent ? "font-semibold" : ""}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <p className="mt-0.5 text-xs text-tf-accent">
                        {step.description}
                      </p>
                    )}
                    {isCompleted && (
                      <p className="mt-0.5 text-xs text-tf-success">Done</p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-center text-xs text-tf-subtle">
          Your progress is saved automatically
        </p>
        </div>
      </nav>

      {/* Mobile top stepper */}
      <nav className="flex items-center gap-1 overflow-x-auto border-b border-tf-border bg-tf-surface px-4 py-3 lg:hidden">
        {steps.map((step, index) => {
          const isCompleted = index <= completedStep && index !== currentStep;
          const isCurrent = index === currentStep;

          return (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              disabled={index > completedStep && !isCurrent}
              title={step.label}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                isCurrent
                  ? "bg-tf-primary text-white"
                  : isCompleted
                    ? "bg-tf-success/15 text-tf-success"
                    : "bg-tf-border text-tf-subtle"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </button>
          );
        })}
      </nav>

      {/* Page content */}
      <main className="flex flex-1 flex-col">
        {/* Progress header */}
        <div className="border-b border-tf-border bg-tf-surface px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-tf-muted">
              Step {currentStep + 1} of 7 —{" "}
              <span className="text-tf-accent">{steps[currentStep].label}</span>
            </p>
            <p className="text-sm text-tf-subtle">
              {Math.round(progressPercent)}%
            </p>
          </div>
          <div className="tf-progress-track mt-2">
            <div
              className="tf-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Page body */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Footer */}
        <div className="border-t border-tf-border py-3 text-center lg:hidden">
          <p className="text-xs text-tf-subtle">
            Your progress is saved automatically
          </p>
        </div>
      </main>
    </div>
  );
}

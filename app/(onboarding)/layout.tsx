"use client";

import { usePathname } from "next/navigation";
import StepperLayout from "@/components/stepper-layout";

const pathToStep: Record<string, number> = {
  "/": 0,
  "/welcome": 1,
  "/platform": 2,
  "/tutorial": 3,
  "/credentials": 4,
  "/rules": 5,
  "/complete": 6,
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = pathToStep[pathname] ?? 0;

  return <StepperLayout currentStep={currentStep}>{children}</StepperLayout>;
}

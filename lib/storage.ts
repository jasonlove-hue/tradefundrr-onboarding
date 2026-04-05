const STORAGE_KEY = "tradefundrr-onboarding";

export interface OnboardingData {
  assetClass: "futures" | "stocks" | "options";
  platform?: string;
  optionsProgram?: "incubator" | "instant-funding";
  rulesAccepted?: boolean;
}

export function saveOnboarding(data: OnboardingData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getOnboarding(): OnboardingData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return null;
  }
}

export function getCompletedStep(): number {
  const data = getOnboarding();
  if (!data) return -1;
  if (data.rulesAccepted) return 6;
  if (data.platform) return 4;
  if (data.assetClass) return 1;
  return -1;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOnboarding, saveOnboarding } from "@/lib/storage";
import { rulesContent } from "@/config/rules";

export default function Rules() {
  const router = useRouter();
  const [assetClass, setAssetClass] = useState<string | null>(null);
  const [optionsProgram, setOptionsProgram] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [disclosureAccepted, setDisclosureAccepted] = useState(false);
  const [showFullRules, setShowFullRules] = useState(true);
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);

  useEffect(() => {
    const data = getOnboarding();
    if (!data || !data.platform) {
      router.push("/");
      return;
    }
    setAssetClass(data.assetClass);
    if (data.optionsProgram) {
      setOptionsProgram(data.optionsProgram);
    }
  }, [router]);

  function handleContinue() {
    const data = getOnboarding();
    if (!data) return;
    saveOnboarding({ ...data, rulesAccepted: true, disclosureAccepted: true });
    router.push("/complete");
  }

  if (!assetClass) return null;

  const rulesKey = assetClass === "options" ? `options-${optionsProgram}` : assetClass;
  const rules = rulesContent[rulesKey];
  if (!rules) return null;

  const canContinue = accepted && disclosureAccepted;

  return (
    <div className="tf-page">
      <div className="w-full max-w-2xl">

        {/* ── 1. Header ── */}
        <div className="text-center">
          <h1 className="text-3xl text-tf-text">Trading Rules & Risk Limits</h1>
          <p className="mt-3 text-tf-muted">
            You must follow these rules to keep your account active and eligible
            for payouts.
          </p>
          <p className="mt-2 text-xs text-tf-subtle">
            Last updated: {rules.lastUpdated}
          </p>
        </div>

        {/* ── 2. Risk Highlight ── */}
        <div className="mt-8 rounded-xl border border-tf-primary/20 bg-tf-primary/5 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tf-primary/15 text-xs font-bold text-tf-primary">
              !
            </span>
            <div>
              <h2 className="font-heading text-sm font-semibold text-tf-text">
                {rules.riskHighlight.title}
              </h2>
              <p className="mt-1 text-sm text-tf-muted">
                {rules.riskHighlight.text}
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. Key Rules Summary ── */}
        <div className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-tf-text">
            Key Rules
          </h2>
          <p className="mt-1 text-sm text-tf-subtle">
            The most important things to know before you start trading.
          </p>

          <div className="mt-6 space-y-8">
            {rules.summarySections.map((section, i) => (
              <div key={i}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tf-accent/15 text-xs font-semibold text-tf-accent">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-tf-text">
                    {section.title}
                  </h3>
                </div>
                <p className="mb-3 pl-8 text-xs text-tf-subtle">
                  {section.takeaway}
                </p>
                <div className="space-y-2 pl-8">
                  {section.items.map((item, j) => (
                    <div key={j} className="tf-card px-4 py-3">
                      <p className="text-sm text-tf-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Full Rule Details ── */}
        <div className="mt-10 rounded-xl border border-tf-border bg-tf-surface/50">
          <button
            onClick={() => setShowFullRules(!showFullRules)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
          >
            <div>
              <h2 className="font-heading text-base font-semibold text-tf-text">
                Full Rule Details
              </h2>
              <p className="mt-0.5 text-xs text-tf-subtle">
                Review the exact rule language before continuing.
              </p>
            </div>
            <span className="ml-4 text-sm font-medium text-tf-accent">
              {showFullRules ? "Hide" : "Show"}
            </span>
          </button>

          {showFullRules && (
            <div className="border-t border-tf-border px-6 pb-6 pt-4">
              <div className="space-y-6">
                {rules.fullRules.map((section, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tf-border text-[10px] font-semibold text-tf-subtle">
                        {i + 1}
                      </span>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-tf-subtle">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="ml-7 space-y-1.5">
                      {section.body.map((line, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm leading-relaxed text-tf-muted/80"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tf-subtle/60" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 5. Disclaimer ── */}
        <div className="tf-disclaimer mt-8">
          <p className="text-sm text-tf-accent">
            This is a simulated trading environment. These rules apply to your
            simulated account, not a live brokerage account.
          </p>
        </div>

        {/* ── 6. Trader Commitment ── */}
        <div className="mt-8 rounded-xl border border-tf-accent/20 bg-tf-accent/5 p-6">
          <h2 className="font-heading text-lg font-semibold text-tf-text">
            Your Trading Commitment
          </h2>
          <p className="mt-2 text-sm text-tf-muted">
            Trading in this program takes place in a simulated environment, but
            the rules and expectations mirror real trading conditions. Review and
            commit before continuing.
          </p>
          <ul className="mt-5 space-y-3">
            <li className="flex items-start gap-3 text-sm text-tf-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tf-accent/15 text-xs text-tf-accent">
                ✓
              </span>
              I will respect daily loss limits and protect my account
            </li>
            <li className="flex items-start gap-3 text-sm text-tf-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tf-accent/15 text-xs text-tf-accent">
                ✓
              </span>
              I understand consistency is required to qualify for payouts
            </li>
            <li className="flex items-start gap-3 text-sm text-tf-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tf-accent/15 text-xs text-tf-accent">
                ✓
              </span>
              I will follow all platform rules and trading restrictions
            </li>
            <li className="flex items-start gap-3 text-sm text-tf-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tf-accent/15 text-xs text-tf-accent">
                ✓
              </span>
              I accept that violating rules can result in account failure
            </li>
          </ul>
        </div>

        {/* ── 7. Rules Acknowledgment ── */}
        <div className="tf-card mt-8 flex items-center gap-3 p-5">
          <input
            id="accept-rules"
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-5 w-5 shrink-0 rounded border-tf-border bg-tf-bg text-tf-primary accent-tf-primary focus:ring-tf-primary"
          />
          <label
            htmlFor="accept-rules"
            className="cursor-pointer text-tf-muted"
          >
            I understand and commit to trading within these rules
          </label>
        </div>

        {/* ── 8. Important Disclosures ── */}
        <div className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-tf-text">
            Important Disclosures
          </h2>
          <div className="tf-card mt-4 p-5">
            <p className="text-sm leading-relaxed text-tf-muted/80">
              TradeFundrr provides simulated trading programs and does not offer
              investment advice or brokerage services.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-tf-muted/80">
              Trading involves risk and is not suitable for all users. No
              guarantee of profit is made.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-tf-muted/80">
              Simulated performance results have limitations and do not reflect
              actual trading outcomes.
            </p>
            <button
              onClick={() => setShowDisclosureModal(true)}
              className="mt-4 text-sm font-medium text-tf-accent hover:underline"
            >
              View full disclosure
            </button>
          </div>

          <div className="tf-card mt-4 flex items-center gap-3 p-5">
            <input
              id="accept-disclosure"
              type="checkbox"
              checked={disclosureAccepted}
              onChange={(e) => setDisclosureAccepted(e.target.checked)}
              className="h-5 w-5 shrink-0 rounded border-tf-border bg-tf-bg text-tf-primary accent-tf-primary focus:ring-tf-primary"
            />
            <label
              htmlFor="accept-disclosure"
              className="cursor-pointer text-tf-muted"
            >
              I understand and agree to the TradeFundrr Risk and Disclosure
              Statements
            </label>
          </div>
        </div>

        {/* ── 9. CTA ── */}
        <div className="mt-10 text-center">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="tf-button-primary"
          >
            Accept & Continue
          </button>
        </div>
      </div>

      {/* ── Disclosure Modal ── */}
      {showDisclosureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-tf-border bg-tf-surface p-8">
            <button
              onClick={() => setShowDisclosureModal(false)}
              className="absolute right-4 top-4 text-tf-subtle hover:text-tf-text"
            >
              Close
            </button>

            <h2 className="font-heading text-2xl font-bold text-tf-text">
              TradeFundrr Disclosures
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-tf-muted">
              <div>
                <h3 className="font-heading text-base font-semibold text-tf-text">
                  General Disclosure
                </h3>
                <p className="mt-2">
                  TradeFundrr is a simulated trading platform provider. We do
                  not provide investment advice, brokerage services, or act as a
                  broker-dealer. All accounts provided through TradeFundrr are
                  simulated trading accounts and do not involve real capital or
                  live market execution. Users should not interpret any content,
                  communications, or materials from TradeFundrr as financial or
                  investment advice.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-base font-semibold text-tf-text">
                  Risk Disclosure
                </h3>
                <p className="mt-2">
                  Trading financial instruments, including futures, stocks, and
                  options, involves substantial risk of loss and is not suitable
                  for all individuals. Past performance, whether actual or
                  simulated, is not indicative of future results. You should
                  carefully consider whether trading is appropriate for you in
                  light of your financial condition and risk tolerance. No
                  guarantee of profit is made or implied by TradeFundrr or its
                  affiliates.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-base font-semibold text-tf-text">
                  Hypothetical Performance Disclaimer
                </h3>
                <p className="mt-2">
                  Simulated trading programs are designed with the benefit of
                  hindsight. Hypothetical or simulated performance results have
                  certain limitations. Unlike an actual performance record,
                  simulated results do not represent actual trading. Because the
                  trades have not actually been executed, the results may have
                  under- or over-compensated for the impact of certain market
                  factors, such as liquidity. Simulated trading programs in
                  general are also subject to the fact that they are designed
                  with the benefit of hindsight. No representation is being made
                  that any account will or is likely to achieve profits or losses
                  similar to those shown.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-base font-semibold text-tf-text">
                  Testimonial Disclosure
                </h3>
                <p className="mt-2">
                  Testimonials appearing on TradeFundrr platforms or
                  communications may not be representative of the experience of
                  other users and are not guarantees of future performance or
                  success. Individual results may vary.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowDisclosureModal(false)}
                className="tf-button-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

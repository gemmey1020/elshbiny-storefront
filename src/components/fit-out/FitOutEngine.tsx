"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ClipboardCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MannequinLoader } from "@/components/shared/MannequinLoader";
import { ProgressBar } from "@/components/fit-out/ProgressBar";
import { StepCard } from "@/components/fit-out/StepCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pickLocalized } from "@/i18n/config";
import { useFitOutStore } from "@/store/useFitOutStore";
import { type FitOutQuestion, listFitOutQuestions } from "@/lib/fitOut";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 720 : -720,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 720 : -720,
    opacity: 0,
  }),
};

export function FitOutEngine() {
  const { locale } = useLanguage();
  const [questions, setQuestions] = useState<FitOutQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const { currentStep, answers, direction, setAnswer, nextStep, prevStep, reset } = useFitOutStore();

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      setIsLoading(true);
      setApiError(null);

      try {
        const data = await listFitOutQuestions();

        if (!cancelled) {
          setQuestions(data);
          reset();
        }
      } catch {
        if (!cancelled) {
          setQuestions([]);
          setApiError(pickLocalized(locale, { en: "The setup path could not load right now.", ar: "مسار التجهيز مش قادر يتحمل دلوقتي." }));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [locale, reset]);

  const activeQuestion = questions[currentStep];
  const selectedValue = activeQuestion ? answers[String(activeQuestion.id)] : undefined;
  const isLastStep = questions.length > 0 && currentStep === questions.length - 1;

  return (
    <div className="glass-panel min-h-[620px] overflow-hidden rounded-md p-5 md:p-10">
      {isLoading ? (
        <div className="grid min-h-[520px] place-items-center text-center">
          <MannequinLoader label="Preparing setup choices" labelAr="بنجهز اختيارات التجهيز" />
        </div>
      ) : null}

      {apiError ? (
        <div className="grid min-h-[520px] place-items-center text-center">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-steel">{pickLocalized(locale, { en: "Setup path", ar: "مسار التجهيز" })}</p>
            <h2 className="mt-4 font-headline text-4xl text-white">{pickLocalized(locale, { en: "Questions unavailable", ar: "الأسئلة مش متاحة" })}</h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">{apiError}</p>
          </div>
        </div>
      ) : null}

      {!isLoading && !apiError && questions.length === 0 ? (
        <div className="grid min-h-[520px] place-items-center text-center">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-steel">{pickLocalized(locale, { en: "No questions", ar: "مفيش أسئلة" })}</p>
            <h2 className="mt-4 font-headline text-4xl text-white">{pickLocalized(locale, { en: "Fit-out engine is empty", ar: "مسار التجهيز فاضي" })}</h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              {pickLocalized(locale, { en: "Setup questions are being prepared for the showroom.", ar: "أسئلة التجهيز بتتجهز للمعرض." })}
            </p>
          </div>
        </div>
      ) : null}

      {activeQuestion ? (
        <div className="flex min-h-[540px] flex-col">
          <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
          <div className="mt-8 flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase text-accent-steel">
                {pickLocalized(locale, { en: "Step", ar: "خطوة" })} {currentStep + 1} / {questions.length}
              </p>
              <h1 className="mt-4 max-w-3xl font-headline text-4xl text-white md:text-5xl">
                {pickLocalized(locale, { en: activeQuestion.question_en, ar: activeQuestion.question_ar })}
              </h1>
            </div>
            <ClipboardCheck aria-hidden className="hidden h-10 w-10 text-accent-platinum md:block" strokeWidth={1.5} />
          </div>

          <div className="relative mt-10 min-h-[260px] flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-x-0 top-0"
              >
                <StepCard question={activeQuestion} selectedValue={selectedValue} onSelect={(value) => setAnswer(activeQuestion.id, value)} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border-metallic pt-6 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="inline-flex h-12 items-center justify-center gap-2 border border-border-metallic px-5 text-sm font-semibold uppercase text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              {pickLocalized(locale, { en: "Previous", ar: "السابق" })}
            </button>

            {isLastStep ? (
              <Button href="/inquiry" icon={ArrowRight} className="w-full md:w-auto">
                {pickLocalized(locale, { en: "Generate Engineering Quote", ar: "جهز طلب عرض السعر" })}
              </Button>
            ) : (
              <Button icon={ArrowRight} onClick={() => nextStep(questions.length)} disabled={!selectedValue} className="w-full md:w-auto">
                {pickLocalized(locale, { en: "Next Step", ar: "الخطوة الجاية" })}
              </Button>
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-6 text-center text-sm text-text-secondary">
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center gap-3 border border-white/20 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase text-white transition hover:border-white hover:bg-white/10"
        >
          <ShoppingBag aria-hidden className="h-4 w-4" strokeWidth={1.8} />
          {pickLocalized(locale, { en: "Prefer manual selection? Browse the catalog.", ar: "حابب تختار بنفسك؟ افتح الكتالوج." })}
        </Link>
      </div>
    </div>
  );
}

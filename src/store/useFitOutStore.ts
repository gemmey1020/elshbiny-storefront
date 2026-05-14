"use client";

import { create } from "zustand";

type FitOutAnswerValue = string | number | boolean | string[];

type FitOutStore = {
  currentStep: number;
  answers: Record<string, FitOutAnswerValue>;
  direction: -1 | 0 | 1;
  setAnswer: (questionId: string | number, value: FitOutAnswerValue) => void;
  nextStep: (totalSteps?: number) => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
};

export const useFitOutStore = create<FitOutStore>()((set) => ({
  currentStep: 0,
  answers: {},
  direction: 0,
  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [String(questionId)]: value,
      },
    })),
  nextStep: (totalSteps) =>
    set((state) => ({
      currentStep:
        typeof totalSteps === "number"
          ? Math.min(state.currentStep + 1, Math.max(totalSteps - 1, 0))
          : state.currentStep + 1,
      direction: 1,
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
      direction: -1,
    })),
  goToStep: (step) =>
    set((state) => ({
      currentStep: Math.max(0, step),
      direction: step > state.currentStep ? 1 : -1,
    })),
  reset: () => set({ currentStep: 0, answers: {}, direction: 0 }),
}));

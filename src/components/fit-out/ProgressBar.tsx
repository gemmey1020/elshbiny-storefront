"use client";

import { motion } from "framer-motion";

export function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="h-2 w-full overflow-hidden bg-white/10">
      <motion.div
        className="h-full bg-accent-platinum shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}

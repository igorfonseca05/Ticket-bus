"use client";

import { Circle, CircleCheck } from "lucide-react";
import { motion } from "framer-motion";

export function SuccessComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30">
        <CircleCheck />
        <p className="text-green-800 dark:text-green-300 text-base">
          Passagens encontradas! Veja as opções abaixo.
        </p>
      </div>
    </motion.div>
  );
}

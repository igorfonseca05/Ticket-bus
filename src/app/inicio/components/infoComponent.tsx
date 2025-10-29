"use client";
import { Info } from "lucide-react";

import { motion } from "framer-motion";

export function InfoComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 p-4 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20 dark:border-sky-500/30">
        <Info className="text-sky-500" />
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Buscando as melhores opções para sua viagem...
        </p>
      </div>
    </motion.div>
  );
}

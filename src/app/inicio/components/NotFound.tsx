"use client";

import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <main className="flex flex-1 justify-center px-4">
        <div className="layout-content-container flex flex-col max-w-2xl w-full flex-1">
          <div className=" bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5 text-center flex flex-col items-center">
            <Frown
              size={44}
              className="text-6xl sm:text-7xl text-sky-500 mb-4"
            />
            <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-black leading-tight tracking-[-0.033em]">
              Ops! Sem Passagens
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-md sm:text-lg font-normal leading-normal mt-4 max-w-md">
              Nenhuma passagem encontrada para este percurso. Por favor, tente
              outra data ou destino.
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

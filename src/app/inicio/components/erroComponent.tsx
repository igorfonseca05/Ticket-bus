"use client"

import { CircleX } from "lucide-react";

import { motion } from "framer-motion";

export function ErroComponent({ message }: { message: string }) {
  return (
    <motion.div
        initial={{opacity: 0, y: 50}}
        animate ={{opacity: 1, y: 0}}
        transition={{duration: 0.3}}>
      <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 dark:border-red-500/30">
        <CircleX className="text-red-400" />
        <p className="text-red-700 dark:text-red-300 text-base">{message}</p>
      </div>
    </motion.div>
  );
}

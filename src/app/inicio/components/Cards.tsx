"use client";

import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Company } from "../../../../utils/types";

export function Cards({ companies }: { companies: string }) {
  const data: Company = JSON.parse(companies);

  console.log(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-md border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="shrink-0">
          {/* Imagem (Altere o src para um caminho local ou externo real) */}
          <img
            alt="Logo da Viação Cometa"
            className="h-12 sm:h-14 object-contain rounded-md"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpxnUeEKndDdewPEk8xf6HUyUz4RqPji_QW3hL2vL4QpHZjYY4pBou8WuFLp5WEfNBH0XOWujhU7p4_bDYm-IfXZuA6yi4tME2VtLYYNExm3y0XAuUdYWQGr8JSmDcG1aLOdA2yhUWV1zYBsF0zxmg2Lme0Yy-H7NxyRBU5yo5BoSGy8PmLDORnWljzIy26U04eTqWSX5PnD4VlCWMcmKPEVWyB4mPXZVVGgafl0RlLmb3zdaZOq8SWxAZ9t9WBZ2_FHecdnitDrnk"
          />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left w-full">
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {data.name}
              </p>
              <div className="inline-flex ml-2 items-center gap-2 px-3 py-1 rounded-full dark:bg-gray-800">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {data.routes[0].from}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {data.routes[0].to}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 dark:text-gray-400">
              <Clock size={18}/>
              <p className="text-base">Partida: {data.routes[0].time}</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              R$ {data.routes[0].price}
            </p>
            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-sky-500 text-white gap-2 text-base font-bold leading-normal px-4 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150">
              Selecionar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

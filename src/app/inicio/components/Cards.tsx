"use client";

import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Company } from "../../../../utils/types";
import { useState } from "react";
import SeatSelectionModal from "./Modal";
import { ObjectId } from "mongodb";
import { useSearchParams } from "next/navigation";

interface CardProps {
  companies: string,
}

export function Cards({ companies}: CardProps) {

  const params = useSearchParams()
  const data: Company = JSON.parse(companies);

  const [isOpen, setIsOpen] = useState(false)
  const [dataTrip, setDataTrip] = useState<Company>()

  function handleModal(data: Company) {
    setDataTrip(data)
    setIsOpen(!isOpen)
  }

  return (
    <motion.div
    >
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow-md border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="shrink-0">
          {/* Imagem (Altere o src para um caminho local ou externo real) */}
          <img
            alt="Logo da Viação Cometa"
            className="h-12 sm:h-14 object-contain rounded-md"
            src={data.logo}
          />
      
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left w-full">
          <div className="flex flex-col gap-y-1">
            <div className="flex flex-col gap-y-1">
               <p className="text-lg font-bold text-gray-900 dark:text-white">
                {data.name}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full dark:bg-gray-800">
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
          <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-40">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              R$ {data.routes[0].price.toFixed(2)}
            </p>
            <button onClick={() => handleModal(data)} className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-sky-500 text-white gap-2 text-base font-bold px-4 hover:bg-opacity-90 transition-all duration-150 w-full sm:w-40">
              Selecionar
            </button>
            {isOpen && <SeatSelectionModal 
            setIsOpen={setIsOpen} 
            isOpen={isOpen} 
            data={dataTrip}
            date={params.get('date')}
            />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // estilos padrão
import { Calendar } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

type TextInputProps = {
  handleChanges: (e: { target: { name: string; value: string } }) => void; // tipagem do evento
  error: { from: string; to: string; date: string };
};

export const DateInput: React.FC<TextInputProps> = ({
  handleChanges,
  error,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  function handleChange(date: Date | null) {
    handleChanges({
      target: {
        name: "date",
        value: date ? date.toISOString() : "",
      },
    });
  }

  return (
    <label className="flex flex-col min-w-40 flex-1 relative">
      <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
        Quando?
      </p>
      <div className="relative flex w-full flex-1 items-stretch rounded-lg group">
        <Calendar className="absolute z-10 top-4 left-4 text-gray-400 group-focus-within:text-sky-500" />

        <DatePicker
          autoComplete="off"
          name="date"
          minDate={new Date()}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleChange(date);
          }}
          placeholderText="Selecione a data da viagem"
          className={`form-input pl-12 w-70 sm:w-151 h-14 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 text-base font-normal leading-normal appearance-none transition-all 
          ${error.date ? "border-2 border-red-500" : ""} `}
          calendarClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2"
          locale={ptBR} // <-- calendário em português
          dateFormat="dd/MM/yyyy" // formato de data BR
          shouldCloseOnSelect={true}
        />
      </div>
      {error.date && (
        <motion.p
          className="text-xs text-red-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error.date}
        </motion.p>
      )}
    </label>
  );
};

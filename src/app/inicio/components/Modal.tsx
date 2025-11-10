import React, { useEffect, useState } from "react";
import { X, DoorClosed, Ticket } from "lucide-react";
import { Company } from "../../../../utils/types";
import Link from "next/link";
import { useUser } from "../../../../context/UserContext";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: Company | undefined;
  date: string | null;
}

const SeatSelectionModal = ({ setIsOpen, isOpen, data, date }: ModalProps) => {
  const {user}= useUser();
  const [seatNumber, setSeatNumber] = useState<number | null>(null);

  useEffect(() => {
    if (!seatNumber || !data || !date) return;

    localStorage.setItem(
      "ticket",
      JSON.stringify({
        ticketDetails: {
          ...data,
          date,
          seatNumber,
        },
        buyerInfos: {
            ...user
        },
      })
    );
  }, [seatNumber, data, date]);

  const generateSeats = () => {
    const seats = [];
    for (let i = 1; i <= 44; i += 4) {
      seats.push(
        <React.Fragment key={i}>
          <button
            onClick={() => setSeatNumber(i)}
            className={`aspect-square rounded-lg border-2 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800/20 transition-colors text-gray-800 dark:text-gray-200 text-sm font-bold w-full ${
              seatNumber === i &&
              ` bg-blue-600 text-white text-sm font-bold w-full ring-4 ring-blue-300`
            }`}
          >
            {String(i).padStart(2, "0")}
          </button>
          <button
            onClick={() => setSeatNumber(i + 1)}
            className={`aspect-square rounded-lg border-2 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800/20 transition-colors text-gray-800 dark:text-gray-200 text-sm font-bold w-full ${
              seatNumber === i + 1 &&
              ` bg-blue-600 text-white text-sm font-bold w-full ring-4 ring-blue-300`
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
          <div className="col-start-4">
            <button
              onClick={() => setSeatNumber(i + 2)}
              className={`aspect-square rounded-lg border-2 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800/20 transition-colors text-gray-800 dark:text-gray-200 text-sm font-bold w-full ${
                seatNumber === i + 2 &&
                ` bg-blue-600 text-white text-sm font-bold w-full ring-4 ring-blue-300`
              }`}
            >
              {String(i + 2).padStart(2, "0")}
            </button>
          </div>
          <div>
            <button
              onClick={() => setSeatNumber(i + 3)}
              className={`aspect-square rounded-lg border-2 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800/20 transition-colors text-gray-800 dark:text-gray-200 text-sm font-bold w-full ${
                seatNumber === i + 3 &&
                ` bg-blue-600 text-white text-sm font-bold w-full ring-4 ring-blue-300`
              }`}
            >
              {String(i + 3).padStart(2, "0")}
            </button>
          </div>
        </React.Fragment>
      );
    }
    return seats;
  };

  return (
    // Backdrop (fixed inset-0 z-50)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      {/* Modal Container (bg-white dark:bg-gray-800) */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Cabeçalho do Modal */}
        <div className="p-6 sm:p-8 shrink">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Detalhes da Passagem
              </h2>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-1">
                Confirme os detalhes e escolha seu assento.
              </p>
            </div>
            {/* Botão de fechar - Sugestão: use 'onClose' do prop */}
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Fechar Modal"
            >
              <X />
            </button>
          </div>
          {/* Detalhes da Viagem */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center sm:text-left border-t border-b border-gray-200 dark:border-gray-700 py-6">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Origem
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {data?.routes[0].from}
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Destino
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {data?.routes[0].to}
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Data e Hora
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {date} {data?.routes[0].time}
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Companhia
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {data?.name}
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Preço
              </p>
              <p className="text-lg font-bold text-blue-600">
                R$ {data?.routes[0].price}
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal - Seleção de Assentos */}
        <div className="px-6 sm:px-8 py-6 bg-gray-100 dark:bg-gray-900 grow">
          <p className="text-center text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Selecione sua poltrona
          </p>
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-sm">
              <div className="flex justify-end mb-4">
                <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <DoorClosed />
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">
                    Porta
                  </p>
                </div>
              </div>

              {/* Mapa de Assentos */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {generateSeats()}
              </div>
            </div>
          </div>

          {/* Legenda */}
          <div className="mt-6 flex justify-center gap-x-6 gap-y-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-md border-2 border-blue-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Disponível
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-md bg-blue-600 border-2 border-blue-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Selecionado
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Ocupado
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé do Modal com Botão de Ação */}
        <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink">
          <Link
            href={"/payment"}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-blue-600 text-white gap-2 text-xl font-bold leading-normal tracking-[0.015em] px-6 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150"
          >
            Escolher Poltrona {seatNumber}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;

import { startTransition, useEffect, useState } from "react";
import { getUserById } from "../../../../utils/actions";
import { User } from "../../../../utils/types";
import { Download, X } from "lucide-react";
import { getFormatedDate, handleDownload } from "../../../../utils/functions";
import { ModalProps } from "../../../../utils/types";

export function TicketModal({ isOpen, setIsOpen, id }: ModalProps) {
  const [details, setDetails] = useState<User | null>();

  if (!id) return;

  useEffect(() => {
    startTransition(async () => {
      const user = await getUserById(id);
      setDetails(user);
    });
  }, []);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4"
        >
          {/* Modal Content */}
          <div className="w-full max-w-xl bg-[#FAF8F5] dark:bg-[#1A242E] rounded-xl shadow-2xl flex flex-col p-8 gap-8 relative">
            {/* Botão Fechar */}
            <button className="absolute cursor-pointer top-4 right-4 text-[#666666] dark:text-gray-400 hover:text-[#333333] dark:hover:text-gray-200">
              <span onClick={() => setIsOpen(!isOpen)} className="text-3xl">
                <X />
              </span>{" "}
              {/* Ícone de fechar */}
            </button>

            {/* Título */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#333333] dark:text-gray-100">
                Detalhes da Passagem
              </h2>
            </div>

            {/* Conteúdo do Modal */}
            <div className="flex flex-col gap-6">
              {/* Bloco de Passageiro */}
              <div className="flex flex-col gap-1 p-4 bg-[#5A9BDB]/10 dark:bg-[#5A9BDB]/20 rounded-lg">
                <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                  Passageiro
                </span>
                <p className=" capitalize text-xl font-bold text-[#333333] dark:text-gray-100">
                  {details?.name}
                </p>
                <span className="text-base text-[#666666] dark:text-gray-300">
                  CPF:
                </span>
              </div>

              {/* Detalhes da Viagem */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Origem
                  </span>
                  <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                    {details?.tickets && details?.tickets[0].route?.from}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Destino
                  </span>
                  <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                    {details?.tickets && details?.tickets[0].route?.to}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Data e Horário
                  </span>
                  {details?.tickets && (
                    <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                      {details?.tickets[0].date} -{" "}
                      {details?.tickets[0].route?.time}
                    </p>
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Poltrona
                  </span>
                  <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                    23
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Companhia
                  </span>
                  <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                    {details?.tickets && details?.tickets[0].name}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-[#666666] dark:text-gray-400">
                    Data da Compra
                  </span>
                  <p className="text-lg font-semibold text-[#333333] dark:text-gray-200">
                    {details?.tickets &&
                      new Date(details?.tickets[0].createdAt).toLocaleString(
                        "pt-BR"
                      )}
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de Ação */}
            {details && (
              <button
                onClick={() => handleDownload(details)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 py-4 px-6 text-xl font-bold text-white shadow-lg transition-colors hover:bg-sky-600/90"
              >
                <Download /> {/* Ícone de download */}
                <span>Baixar Passagem</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

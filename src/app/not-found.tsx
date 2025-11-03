import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 justify-center items-center py-10 sm:py-16 md:py-20 px-4 h-screen bg-gray-50">
      <div className="layout-content-container flex flex-col items-center max-w-2xl w-full flex-1">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full text-center">
          <div className="flex justify-center mb-6">
            <CircleAlert size={45} className="text-sky-500" />
          </div>

          <h1 className="text-gray-900 dark:text-white text-4xl sm:text-2xl font-black leading-tight tracking-[-0.033em]">
            Página Não Encontrada
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-md sm:text-lg font-normal leading-normal max-w-lg mx-auto">
            Ops! A página que você está procurando não existe ou foi removida.
          </p>
          <Link
            href={"/inicio"}
            className="mt-8 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-sky-500 text-white gap-2 text-lg font-bold leading-normal tracking-[0.015em] px-8 hover:bg-sky-600 active:scale-[0.98] transition-all duration-150"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}

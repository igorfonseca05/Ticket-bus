"use client"

import { ArrowLeft, CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  handleFormVisibility: () => void;
}

export default function SearchResultsHeader({
  handleFormVisibility,
}: HeaderProps) {
  const router = useRouter();

  async function removingSeachParams() {
    if (window.location.search) {
      const url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", url);
      router.push("/inicio");
    }
    
    setTimeout(() => {
      handleFormVisibility()
    }, 200);
  }

  return (
    <>
      <Link href={'/inicio'} onClick={removingSeachParams}>
      <CircleArrowLeft className="mt-8 sm:hidden" />
      </Link>
      <div className="flex items-center p-2 rounded-md mb-4 bg-white mt-4 sm:mt-8">
        <button
          onClick={removingSeachParams}
          className="items-center hidden sm:flex hover:cursor-pointer hover:text-sky-400"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium ml-2">Voltar</span>
        </button>
        <div className="flex justify-center flex-1">
          <h2 className="text-xl text-ce font-semibold text-gray-800">
            Resultados da Busca
          </h2>
        </div>
      </div>
    </>
  );
}

import { Bus } from "lucide-react";
import Link from "next/link";

export function EmptyHistoric() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-4 px-4 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
      <div className="p-6 mb-2">
        <Bus className=" text-sky-500" size={42} />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Nenhum histórico de passagens
      </h2>

      <p className="text-gray-500 max-w-sm text-sm">
        Você ainda não comprou nenhuma passagem. Assim que fizer sua primeira
        compra, o histórico aparecerá aqui.
      </p>

      <Link
        href={"/inicio"}
        className="mt-4 px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white text-sm font-medium transition"
      >
        Explorar passagens disponiveis
      </Link>
    </div>
  );
}

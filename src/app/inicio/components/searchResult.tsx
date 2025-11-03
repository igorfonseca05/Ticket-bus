import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  handleFormVisibility: () => void;
}

export default function SearchResultsHeader({
  handleFormVisibility,
}: HeaderProps) {

    const router = useRouter()
    
  function removingSeachParams() {
    if (window.location.search) {
      const url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", url);
     router.push('/inicio')
    }

    handleFormVisibility()
  }

  return (
    <div className="flex items-center pt-8 mb-4">
      <button
        onClick={removingSeachParams}
        className="flex items-center hover:cursor-pointer hover:text-sky-400"
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
  );
}

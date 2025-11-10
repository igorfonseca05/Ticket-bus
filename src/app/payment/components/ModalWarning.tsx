"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface LoginRequiredModalProps {
  onClose: () => void;
}

export default function LoginRequiredModal({
  onClose,
}: LoginRequiredModalProps) {
  const router = useRouter();

  // Bloqueia o scroll de fundo quando o modal abre
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-fadeIn">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
          Login necessário
        </h2>

        {/* Texto descritivo */}
        <p className="text-center text-gray-600 mb-6">
          Você precisa fazer login para continuar com o pagamento.
        </p>

        {/* Botão principal */}
        <Link
          href={"/auth"}
          className="w-full block text-center bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-xl transition"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  );
}

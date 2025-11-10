import { CircleX } from "lucide-react";
import {motion} from 'framer-motion'

type Status = "idle" | "loading" | "approved" | "denied"

export function Denied({setStatus}: {setStatus: (status: Status) => void}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 text-center p-4 rounded "
    >
      <div className="bg-red-50 w-15 h-15 rounded-full flex justify-center m-auto mb-2">
        <CircleX className="m-auto text-red-700" size={36} />
      </div>
      <p className="font-bold text-2xl text-red-600">Pagamento reprovado</p>
      <p className="text-[11px] text-gray-500 mt-1">
        Verifique os dados e tente novamente.
      </p>

      <button
        onClick={() => setStatus("idle")}
        className="mt-8 cursor-pointer bg-red-600 text-white px-8 py-2 rounded"
      >
        Tentar novamente
      </button>
    </motion.div>
  );
}

import {motion} from 'framer-motion'
import { CircleCheck } from 'lucide-react';
import { User } from '../../../../utils/types';
import { handleDownload } from '../../../../utils/functions';
import Link from 'next/link';
import { useUser } from '../../../../context/UserContext';

export function Approved({ticket, id}:{ticket: User | null, id: string | undefined}) {


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-40 text-center p-4 rounded flex flex-col"
    >
      <div className="bg-green-50 w-15 h-15 rounded-full flex justify-center m-auto mb-2">
        <CircleCheck className="m-auto text-green-700" size={36} />
      </div>
      <p className="font-bold text-2xl text-green-700">Pagamento aprovado</p>
      <p className='text-xs mt-2'>Sua passagem foi gerada com sucesso! Você pode baixá-la agora ou acessá-la a qualquer momento na página minhas passagens</p>
      <button
        onClick={() => handleDownload(ticket)}
        className="mt-8 cursor-pointer bg-green-600 text-white px-8 py-4 rounded-lg"
      >
        Baixar passagem (PDF)
      </button>
      <Link href={`/profile/${id}`} className='mt-6 font-medium'>Minhas passagens</Link>
    </motion.div>
  );
}

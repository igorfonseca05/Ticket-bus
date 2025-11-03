import { FormHeader } from "../inicio/components/formHeader";
import { Form } from "./components/Form";

import { Mail, LockIcon } from "lucide-react";
import { FormAuthHeader } from "./components/header/FormAuthHeader";
import { FormsContainer } from "./components/formsContainer/FormsContainer";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-sky-50 dark:bg-gray-900 group/design-root overflow-x-hidden p-4 sm:p-6 lg:p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex-col justify-center hidden lg:flex">
          <div className="flex flex-col text-left">
            <p className="text-sky-500 dark:text-sky-500 text-2xl font-bold">
              Passagem Sênior
            </p>
            <p className="text-gray-900 dark:text-white text-5xl sm:text-6xl font-black leading-tight tracking-[-0.033em] mt-4">
              Sua próxima viagem começa aqui.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-xl sm:text-2xl font-normal leading-normal mt-6">
              Compre passagens com descontos exclusivos de forma simples, segura
              e pensada para você.
            </p>
          </div>
        </div>
        <FormsContainer/>
      </div>
    </div>
  );
}

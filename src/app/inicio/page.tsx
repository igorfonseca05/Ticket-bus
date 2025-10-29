import { Cards } from "./components/Cards";
import { ErroComponent } from "./components/erroComponent";
import { InfoComponent } from "./components/infoComponent";
import { InitForm } from "./components/InitForm";

import { HelpCircle } from "lucide-react";
import ClientPromise from "../../../database/db";
import { Company } from "../../../utils/types";



export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  
  const {from, to} = (await searchParams)

  const trip = (await ClientPromise).db('trip')
  const companies = await trip.collection<Company>('companies')

  const res = await companies.find<Company>({ "routes.from": from, "routes.to": to },
  {projection: { "routes.$": 1, name: 1, logo: 1 }}).toArray()

  console.log(res)

  // const convertedData = JSON.stringify(res)

  return (
    <div>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-black/10 dark:border-b-white/10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-4 text-sky-500">
              <div className="size-8">
                {/* Ícone de Logo (SVG) */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                Passagem Sênior
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <a
                className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal hover:text-sky-500 dark:hover:text-sky-500 transition-colors flex items-center gap-2"
                href="#"
              >
                {/* Este ícone precisa ser substituído por um componente React Icon */}
                <HelpCircle />
                <span className="hidden sm:inline">Ajuda</span>
              </a>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex flex-1 justify-center py-10 sm:py-16 md:py-0 px-4">
            <div className="layout-content-container flex flex-col max-w-2xl w-full flex-1">
              <div className="flex flex-wrap justify-center text-center gap-3 p-4">
                <div className="flex w-full flex-col gap-3">
                  {/* <p className="text-gray-900 dark:text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
                    Comprar Passagem
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-normal leading-normal">
                    Encontre sua próxima viagem de forma simples e segura.
                  </p> */}
                </div>
              </div>

              {/* Form Container */}
              <InitForm />

              {/* Mensagens de Status (usar o state do useActionState para controlar qual mostrar) */}
              <div className="mt-8 flex flex-col gap-4">
                {/* Mensagem de Info (pode ser usado para loading) */}
                {/* <InfoComponent/> */}

                {/* Mensagem de Erro (usar para state.message) */}
                {/* <ErroComponent message='oi'/> */}

                {res.map((companies, i) => {
                  const jsonData = JSON.stringify(companies)
                  return (
                    <Cards key={i} companies={jsonData} />
                  )
                })}

                {/* Mensagem de Sucesso (mostrar antes do redirect) */}
                <div className="hidden items-center gap-3 p-4 rounded-lg bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30">
                  <span className="material-symbols-outlined text-green-600 text-3xl">
                    check_circle_outline
                  </span>
                  <p className="text-green-800 dark:text-green-300 text-base">
                    Passagens encontradas! Veja as opções abaixo.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

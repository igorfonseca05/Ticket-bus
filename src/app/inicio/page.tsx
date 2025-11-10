import { Cards } from "./components/Cards";
import { ErroComponent } from "./components/erroComponent";
import { InfoComponent } from "./components/infoComponent";
import { InitForm } from "./components/InitForm";

import { HelpCircle, Frown } from "lucide-react";
import ClientPromise from "../../../database/db";
import { Company } from "../../../utils/types";
import { NotFound } from "./components/NotFound";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { UserSection } from "./components/UserSection";
import { MenuHeader } from "../components/MenuHeader";

export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { from, to, date } = await searchParams;

  let res = null;

  if (from && to) {
    const getTrips = unstable_cache(
      async (from: string, to: string) => {
        const trip = (await ClientPromise).db(process.env.DB);
        const companies = await trip.collection<Company>(
          process.env.COLLETION_COMPANIES!
        );

        const res = await companies
          .find<Company>(
            { routes: { $elemMatch: { from, to } } },
            { projection: { "routes.$": 1, name: 1, logo: 1 } }
          )
          .toArray();

        return res;
      },
      ["trip-routes", from, to], // chave de cache única por origem/destino
      { revalidate: 60 * 10 } // cache por 10 minutos (ajuste se quiser)
    );

    res = await getTrips(from, to);
  }

  return (
    <div>
      <MenuHeader />
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="layout-container flex h-full grow flex-col">
          {/* Main Content Area */}
          <main className="flex flex-1 justify-center py-10 sm:py-16 md:py-0 px-4">
            <div className="layout-content-container flex flex-col max-w-2xl w-full flex-1 mb-8">
              {/* Form Container */}
              <InitForm />

              {/* Mensagens de Status (usar o state do useActionState para controlar qual mostrar) */}
              <div className="mt-8 flex flex-col gap-4">
                {res?.length !== 0 ? (
                  res?.map((companies, i) => {
                    const jsonData = JSON.stringify(companies);
                    return <Cards key={i} companies={jsonData} />;
                  })
                ) : (
                  <NotFound />
                )}

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

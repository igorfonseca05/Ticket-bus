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

import bg from '../../../public/bg.png'

export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {

  // Recebendo parametros pela URL
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
      <MenuHeader path='/inicio' />
      <div style={{ backgroundImage: "url('/bg.png')" }} className="relative bg-cover bg-center h-screen md:pt-15 flex w-full flex-col group/design-root overflow-x-hidden bg-sky-100 dark:bg-gray-900 font-san">
        <div className="layout-container flex h-full grow flex-col">
          {/* Main Content Area */}
          <main className="flex flex-1 justify-center py-10 sm:py-16 md:py-0 px-4">
            <div className="layout-content-container flex flex-col max-w-2xl w-full flex-1 mb-8">
              {/* Form Container */}
              <InitForm />

              {/* Mensagens de Status (usar o state do useActionState para controlar qual mostrar) */}
              <div className="sm:mt-1 flex flex-col gap-4">
                {res?.length !== 0 ? (
                  res?.map((companies, i) => {
                    const jsonData = JSON.stringify(companies);
                    return <Cards key={i} companies={jsonData} />;
                  })
                ) : (
                  <NotFound />
                )}

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

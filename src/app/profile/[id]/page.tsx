import { cookies } from "next/headers";
import ClientPromise from "../../../../database/db";
import { verifySession } from "../../../../utils/session";
import { ObjectId } from "mongodb";
import { User } from "../../../../utils/types";
import { redirect } from "next/navigation";
import { deleteSession } from "../../../../utils/actions";
import { removeUser } from "../../../../utils/functions";
import { Bus, TicketX } from "lucide-react";
import { MenuHeader } from "../../components/MenuHeader";
import Link from "next/link";
import { getFormatedDate } from "../../../../utils/functions";

import { getUserById } from "../../../../utils/actions";
import { TicketModal } from "../components/TicketModal";
import { TripCard } from "../components/tripCard";
import { EmptyHistoric } from "../components/EmptyHistoric";
import { HistoryCard } from "../components/HistoryCard";
import { NextTripContainer } from "../components/NextTripContainer";
// import { useState } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if(!id) return 
  const userDB = await getUserById(id)
  const user: User = JSON.parse(JSON.stringify(userDB))
  

  return (
    <>
    {/* <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} id={id}/> */}
      <MenuHeader path={`/profile/${id}`} />
      <div className="bg-[#FAF8F5] dark:bg-[#111921] font-sans text-[#333333] dark:text-gray-200">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="flex h-full grow flex-col">
            <main className="flex flex-1 justify-center py-5 sm:py-5 px-4">
              <div className="flex flex-col w-full max-w-3xl gap-8">
                {/* PageHeading */}
                <div className="flex flex-wrap justify-between gap-3 px-4">
                  <h1 className="text-[#333333] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                    Meu Perfil
                  </h1>
                </div>
                {/* ProfileHeader Card */}
                <div className="flex flex-col sm:flex-row gap-6 p-6 container bg-white dark:bg-[#1A242E] rounded-xl shadow-sm">
                  <div className="flex items-center sm:items-start gap-6">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 bg-gray-300 shadow flex items-center justify-center text-3xl uppercase"
                      data-alt="Foto de perfil do usuário, um homem sorrindo"
                    >
                      i
                    </div>
                    <div className="flex flex-col justify-center gap-1 sm:hidden">
                      <p className="text-[#333333] dark:text-gray-100 text-2xl font-bold leading-tight tracking-[-0.015em]">
                        {user?.name}
                      </p>
                      <p className="text-[#666666] dark:text-gray-400 text-base font-normal leading-normal">
                        joao.pereira@exemplo.com
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-4">
                    <div className="hidden sm:flex flex-col justify-center gap-1">
                      <p className="text-[#333333] capitalize dark:text-gray-100 text-2xl font-bold leading-tight tracking-[-0.015em]">
                        {user?.name}
                      </p>
                      <p className="text-[#666666] dark:text-gray-400 text-base font-normal leading-normal">
                        {user?.email}
                      </p>
                    </div>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-12 px-6 bg-[#5A9BDB] text-white text-base font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto hover:bg-[#5A9BDB]/90 transition-colors">
                      <span className="text-xl">✏️</span>{" "}
                      {/* Substituído por emoji/texto simples */}
                      <span className="truncate">Editar Perfil</span>
                    </button>
                  </div>
                </div>
                {/* Personal Info Card */}
                <div className="bg-white dark:bg-[#1A242E] rounded-xl p-6 shadow-sm">
                  <h2 className="text-[#333333] dark:text-gray-100 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                    Informações Pessoais
                  </h2>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6">
                    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-[#2D3748] py-5">
                      <p className="text-[#666666] dark:text-gray-400 text-base font-normal leading-normal">
                        CPF
                      </p>
                      <p className="text-[#333333] dark:text-gray-200 text-base font-medium leading-normal">
                        ***.123.456-**
                      </p>
                    </div>
                    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-[#2D3748] py-5">
                      <p className="text-[#666666] dark:text-gray-400 text-base font-normal leading-normal">
                        Telefone
                      </p>
                      <p className="text-[#333333] dark:text-gray-200 text-base font-medium leading-normal">
                        (11) 98765-4321
                      </p>
                    </div>
                    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-[#2D3748] py-5">
                      <p className="text-[#666666] dark:text-gray-400 text-base font-normal leading-normal">
                        Endereço
                      </p>
                      <p className="text-[#333333] dark:text-gray-200 text-base font-medium leading-normal">
                        Rua das Flores, 123, São Paulo - SP
                      </p>
                    </div>
                  </div>
                </div>
                {/* Tickets Section */}
                <div className="flex flex-col gap-8">
                  {/* Upcoming Trips */}
                  <NextTripContainer user={user}/>
                  {/* Purchase History */}
                  <div className="bg-white dark:bg-[#1A242E] rounded-xl p-6 shadow-sm">
                    <h2 className="text-[#333333] dark:text-gray-100 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Histórico de Compras
                    </h2>
                    <ul className="flex flex-col gap-4">
                      {!user.history?.length ? (
                          <EmptyHistoric/>
                      ) : (
                        <>
                          {user.history?.map((ticket, i) => (
                            <HistoryCard key={i} ticket={ticket} id={user._id}/>
                          ))}
                        </>
                      )}
                    </ul>
                    {!user?.tickets && (
                      <div className="flex justify-center mt-6">
                        <button className="text-[#5A9BDB] font-bold hover:underline">
                          Ver mais
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

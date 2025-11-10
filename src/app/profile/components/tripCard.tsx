"use client";

import { User } from "../../../../utils/types";
import { getFormatedDate } from "../../../../utils/functions";
// import { Link } from "lucide-react";
import { TicketX } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { TicketModal } from "./TicketModal";
import Link from "next/link";
import { Timer } from "./Timer";
import { removeTicket } from "../../../../utils/serverActions";

export function TripCard({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timerFinished, setTImerFinished] = useState(false)
  const [ticketId,  setTicketId] = useState('')

  console.log(timerFinished, ticketId)


  useEffect(() => {
    if(!timerFinished) return
    startTransition(async() => {
      if(!user?.tickets) return
      await removeTicket(user?._id!, ticketId, 'tickets')
    })

  }, [timerFinished])


  return (
    <>
      <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} id={user?._id} />
      {!user?.tickets?.length ? (
        <div className="flex flex-col items-center justify-center text-center py-5 px-4 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
          <TicketX className="w-16 h-16 text-sky-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Você ainda não possui próximas viagens
          </h2>
          <p className="text-sm text-gray-600">
            Compre uma passagem para que ela apareça aqui!
          </p>
          <Link
            href={"/inicio"}
            className="mt-4 px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white text-sm font-medium transition"
          >
            Comprar passagem
          </Link>
        </div>
      ) : (
        <>
          {user.tickets.map((ticket) => (
            <li key={String(ticket._id)} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-[#2D3748]">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 bg-[#5A9BDB]/20 rounded-xl text-[#5A9BDB]">
                  <span className="text-3xl">🚌</span>{" "}
                  {/* Substituído por emoji/texto simples */}
                </div>
                <div>
                  <p className="text-[#333333] dark:text-gray-200 font-bold">
                    {ticket?.route?.from} →{" "}
                    {ticket.route?.to}
                  </p>
                  <p className="text-[#666666] flex flex-col dark:text-gray-400 text-sm">
                    {getFormatedDate(ticket.date)} -{" "}
                    {ticket.route?.time} 
                    <Timer setTicketId={setTicketId} ticket={ticket} setTImerFinished={setTImerFinished}/>
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(!isOpen)}
                className="text-[#5A9BDB] font-bold text-sm hover:underline">
                Ver Detalhes
              </button>
            </li>
          ))}
        </>
      )}
    </>
  );
}

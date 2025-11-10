"use client";
import { Ticket, User } from "../../../../utils/types";
import { getFormatedDate } from "../../../../utils/functions";
import { TicketModal } from "./TicketModal";
import { ModalProps } from "../../../../utils/types";
import { useState, useEffect, startTransition } from "react";
import { Trash, Eye } from "lucide-react";
import { removeTicket } from "../../../../utils/serverActions";

export function HistoryCard({ ticket, id }: { ticket: Ticket; id: string }) {
  const formatedDate = getFormatedDate(ticket.date);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-[#2D3748]">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-12 bg-gray-200 dark:bg-gray-700 rounded-xl text-[#666666] dark:text-gray-400">
            <span className="text-3xl">⏱️</span>{" "}
            {/* Substituído por emoji/texto simples */}
          </div>
          <div>
            <p className="text-[#333333] dark:text-gray-200 font-bold">
              {ticket.route?.from} → {ticket.route?.to}
            </p>
            <p className="text-[#666666] dark:text-gray-400 text-sm">
              {formatedDate} - {ticket.route?.time}
            </p>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#5A9BDB] mr-2 font-bold text-sm hover:underline"
          >
            Ver Detalhes
          </button>
          <Trash
            onClick={async () => {
              await removeTicket(id, ticket._id, 'history');
            }}
            className="text-gray-500 hover:text-red-500 font-bold text-sm"
          ></Trash>
        </div>
      </li>
    </>
  );
}

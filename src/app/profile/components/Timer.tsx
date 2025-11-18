"use client";

import { useEffect, useState } from "react";
import { Ticket } from "../../../../utils/types";

interface TimerProps {
  setTImerFinished: (finished: boolean) => void;
  ticket: Ticket;
  setTicketId: (_id: string) => void;
}

export function Timer({ setTImerFinished, ticket, setTicketId }: TimerProps) {
  
  const [time, setTime] = useState(ticket.createdAt + 40 * 1000 - Date.now());

  if (typeof window === "undefined") return null;

  useEffect(() => {
     if (time <= 0) {
      setTicketId(ticket._id);
      setTImerFinished(true);
      return
    }

    let intervalo: NodeJS.Timeout | null = null;
    
    intervalo = setInterval(() => {
      setTime((t) => t - 1000);
    }, 1000);
    
    return () => clearInterval(intervalo); // limpa o intervalo a cada render
  }, [time]);

  const seconds = Math.ceil(time / 1000);

  return (
    <span className="text-red-500">
      Sua viagem terminará em: 00:{seconds < 10 ? `0${seconds}` : seconds}{" "}
      segundos
    </span>
  );
}

"use client";

import { TripCard } from "./tripCard";
import { User } from "../../../../utils/types";
import { startTransition, useEffect } from "react";
import { removeTickets } from "../../../../utils/serverActions";
// import { useEffect } from "react";

export function NextTripContainer({ user }: { user: User | null }) {

    // setTimeout(() => {
    //     if(!user?.tickets) return
    //     removeTickets(user?.tickets[0]._id)
    // }, 2 * 60 * 1000);

  return (
    <div className="bg-white dark:bg-[#1A242E] rounded-xl p-6 shadow-sm">
      <h2 className="text-[#333333] dark:text-gray-100 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
        Próximas Viagens
      </h2>
      <ul className="flex flex-col gap-4">
        <TripCard user={user} />
      </ul>
    </div>
  );
}

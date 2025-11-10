"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  MapPinHouse,
  MapPinCheck,
  Calendar,
  ArrowBigRight,
  Armchair,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { User } from "../../../../utils/types";
import { handleDownload } from "../../../../utils/functions";
import { useUser } from "../../../../context/UserContext";
import { startTransition } from "react";
import { addTicket } from "../../../../utils/actions";
import { PaymentProcessing } from "./PaymentProcessing";
import { Denied } from "./Denied";
import { Approved } from "./Approved";

interface ticketDetailsProps {
  ticketDetails: {
    _id: string;
    name: string;
    date: string;
    logo: string;
    routes: {
      from: string;
      to: string;
      price: number;
      time: string;
    }[];
    seatNumber: number;
  };
  buyerInfos: {
    email: string;
    name: string;
    uid: string;
  };
}

type Status = "idle" | "loading" | "approved" | "denied";

export function CreditCardForm({
  ticketDetails,
  cpf,
  setcpf,
  isValidCPF,
  setStatus,
  setShowModal,
}: {
  ticketDetails: ticketDetailsProps;
  cpf: string;
  setcpf: (e: string) => void;
  isValidCPF: boolean;
  setStatus: (status: Status) => void;
  setShowModal: (modal: boolean) => void;
}) {
  const { user } = useUser();

  const [status, setCardStatus] = useState<Status>("idle");
  const [cardTicket, setCardTicket] = useState<User | null>(null);

  function isEffectivelyEmpty(obj: Record<string, any>): boolean {
    return Object.values(obj).every(
      (value) => value === "" || value === null || value === undefined
    );
  }

  function verifyIfLoggedIn() {
    if (!user) {
      setShowModal(true);
      return;
    }
  }

  async function handleCardPayment(e: FormEvent) {
    e.preventDefault();

    if (!user) {
      setShowModal(true);
      return;
    }

    setCardStatus("loading");

    setTimeout(() => {
      const approved = Math.random() > 0.3; // 70% chance de aprovação

      if (!approved) {
        setCardStatus("denied");
        return;
      }

      const resume = {
        ticketDetails: {
          date: ticketDetails?.ticketDetails.date || "",
          name: ticketDetails?.ticketDetails.name || "",
          logo: ticketDetails?.ticketDetails.logo || "",
          seatNumber: ticketDetails?.ticketDetails.seatNumber || 0,
          _id: ticketDetails?.ticketDetails._id || "",
          route: ticketDetails?.ticketDetails.routes[0] || undefined,
          createdAt: Date.now() || 0,
          paymentMethod: "Cartão de crédito",
        },
        passenger: {
          email: user?.email || "",
          name: user?.name || "",
          _id: user?.uid || "",
        },
      };

      if (isEffectivelyEmpty(resume)) {
        console.log("erro, obj vazio");
        return;
      }

      startTransition(async () => {
        const res = await addTicket(undefined, resume);
        setCardTicket(res);
        setCardStatus("approved");
        setStatus("approved");
      });
    }, 2000);
  }

  return (
    <>
      {status === "idle" && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
          onSubmit={handleCardPayment}
        >
          {/* Número do Cartão */}
          <label className="flex flex-col">
            <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
              Número do Cartão
            </p>
            <div className="flex w-full items-stretch rounded-lg group relative">
              <CreditCard className="m-auto mx-4 absolute top-4 text-gray-400 group-focus-within:text-sky-500 " />
              <input
                className="form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 text-base font-normal leading-normal appearance-none transition-all"
                placeholder="0000 0000 0000 0000"
                type="text"
                defaultValue={"3782 822463 10005"}
                required
              />
            </div>
          </label>

          {/* Nome no Cartão */}
          <label className="flex flex-col">
            <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
              Nome no Cartão
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
              placeholder="Nome como impresso no cartão"
              type="text"
              required
              defaultValue={ticketDetails?.buyerInfos.name || user?.name}
            />
          </label>

          {/* Validade e CVV */}
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex flex-col flex-1">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                Validade
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                placeholder="MM/AA"
                type="text"
                required
                defaultValue={"10/28"}
              />
            </label>
            <label className="flex flex-col flex-1">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                CVV
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-blue-600 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all"
                placeholder="123"
                type="text"
                required
                defaultValue={"265"}
              />
            </label>
          </div>

          {/* CPF do Titular */}
          <label className="flex flex-col">
            <div className="flex items-end">
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                CPF do Titular
              </p>
              <p className="text-xs pb-2 pl-2 text-slate-400">
                (Informe um CPF para finalizar o pagamento)
              </p>
            </div>
            <input
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all `}
              placeholder="000.000.000-00"
              type="text"
              value={cpf}
              required
              onChange={(e) => setcpf(e.target.value)}
            />
          </label>

          {/* Botão de Pagamento */}
          {/* bg-primary virou bg-blue-600 */}
          <button
            disabled={isValidCPF ? false : true}
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-sky-500 text-white gap-2 text-xl font-bold leading-normal tracking-[0.015em] px-6 mt-4 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150 disabled:bg-sky-200 disabled:cursor-not-allowed"
          >
            Confirmar Pagamento
          </button>
        </motion.form>
      )}
      {status === "loading" && <PaymentProcessing />}
      {status === "denied" && <Denied setStatus={setCardStatus} />}
      {status === "approved" && <Approved ticket={cardTicket} id={user?.uid} />}
    </>
  );
}

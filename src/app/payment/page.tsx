"use client";

import { startTransition, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MapPinHouse,
  MapPinCheck,
  Calendar,
  ArrowBigRight,
  Armchair,
} from "lucide-react";
import { CreditCardForm } from "./components/CreditCardForm";
import { validateCPF } from "../../../utils/functions";
import Image from "next/image";
import { useUser } from "../../../context/UserContext";
import { addTicket } from "../../../utils/actions";
import { User } from "../../../utils/types";
import { PaymentProcessing } from "./components/PaymentProcessing";
import { Denied } from "./components/Denied";
import { Approved } from "./components/Approved";
import { MenuHeader } from "../components/MenuHeader";
import { verifySession } from "../../../utils/session";
import LoginRequiredModal from "./components/ModalWarning";
import Link from "next/link";

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

export default function Page() {
  const path = usePathname()
  const { user } = useUser();
  const [ticketDetails, setTicketDetails] = useState<ticketDetailsProps>();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cpf, setcpf] = useState<string>("");
  const [isValidCPF, setIsValidCPF] = useState(false);
  const [qrCode, setQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (cpf.length === 11) {
      setIsValidCPF(validateCPF(cpf));
    } else {
      setIsValidCPF(false);
    }
  }, [cpf]);

  useEffect(() => {
    const storaged = localStorage.getItem("ticket") || "";
    const ticketDetails = JSON.parse(storaged);

    if (!ticketDetails) return;

    setTicketDetails(ticketDetails);
  }, []);

  function generateQR() {
    setLoading(true);

    setTimeout(() => {
      setQRCode(true);
      setLoading(false);
    }, 2500);
  }

  function isEffectivelyEmpty(obj: Record<string, any>): boolean {
    return Object.values(obj).every(
      (value) => value === "" || value === null || value === undefined
    );
  }

  function verifyIfLoggedIn() {
    if (!user) {
      return setShowModal(true);
    }
  }

  async function ResumeTicket() {
    setStatus("loading");

    verifyIfLoggedIn();

    setTimeout(() => {
      const approved = Math.random() > 0.3; // 70% chance de aprovação

      if (!approved) {
        setStatus("denied");
        return;
      }

      setStatus("approved");

      const resume = {
        ticketDetails: {
          date: ticketDetails?.ticketDetails.date || "",
          name: ticketDetails?.ticketDetails.name || "",
          logo: ticketDetails?.ticketDetails.logo || "",
          seatNumber: ticketDetails?.ticketDetails.seatNumber || 0,
          _id: ticketDetails?.ticketDetails._id || "",
          route: ticketDetails?.ticketDetails.routes[0] || undefined,
          createdAt: Date.now() || 0,
          paymentMethod: "Pix",
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
        setTicket(res);
      });
    }, 2000);
  }

  console.log(path)

  return (
    <>
      <MenuHeader path={path} />
      <div className="relative flex h-auto min-h-screen w-full flex-col pt-20 bg-gray-50 group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 justify-center px-4">
            <div className="layout-content-container flex flex-col w-full max-w-6xl">
              {/* Título da Página */}
              <div className="flex flex-col items-center text-center gap-3 p-4">
                <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em]">
                  Pagamento
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-md sm:text-lg font-normal leading-normal">
                  Finalize sua compra com segurança.
                </p>
              </div>

              {/* Layout de Duas Colunas (Resumo e Formulário) */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Coluna 1: Resumo da Viagem */}
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5 mb-4">
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">
                    Informações do Passageiro
                  </h2>
                  <div className="space-y-6">
                    {user ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                            Comprador
                          </p>
                          <div className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                            <span className="capitalize">
                              {ticketDetails?.buyerInfos.name
                                ? ticketDetails?.buyerInfos.name
                                : user?.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                            CPF
                          </p>
                          <div className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                            <span className="capitalize">
                              {cpf ? `${cpf}` : "000.000.000.00"}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 rounded-md bg-gray-50">
                        <p className="mb-4 text-center text-lg text-gray-700">
                          Para finalizar a compra da sua passagem, por favor
                          faça login.
                        </p>
                        <Link href={'/auth'} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-md transition">
                          Fazer Login
                        </Link>
                      </div>
                    )}
                    <div className="border-t border-black/10 dark:border-white/10"></div>
                    <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">
                      Resumo da Viagem
                    </h2>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                        Origem e Destino
                      </p>
                      <div className="flex items-center gap-4 text-gray-900 dark:text-white text-lg font-semibold">
                        {/* text-primary virou text-sky-500 */}
                        <MapPinHouse className="text-sky-500" />
                        <span>
                          {ticketDetails?.ticketDetails.routes[0].from}
                        </span>
                        <ArrowBigRight />
                        <MapPinCheck className="text-sky-500" />
                        <span>{ticketDetails?.ticketDetails.routes[0].to}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                        Data e Hora
                      </p>
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                        <Calendar className="text-sky-500" />
                        <span>
                          {ticketDetails?.ticketDetails.date} -{" "}
                          {ticketDetails?.ticketDetails.routes[0].time}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                        Poltrona
                      </p>
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold">
                        <Armchair className="text-sky-500" />
                        <span>{ticketDetails?.ticketDetails.seatNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-black/10 dark:border-white/10 mt-8 pt-6">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                        Valor Total:
                      </p>
                      {/* text-primary virou text-sky-500 */}
                      <p className="text-sky-500 text-3xl font-bold">
                        R$
                        {ticketDetails?.ticketDetails.routes[0].price.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Formulário de Pagamento */}

                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5 mb-4">
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">
                    Dados do Pagamento
                    <span className="text-xs font-normal">
                      {" "}
                      (Os dados do cartão ficticios)
                    </span>
                  </h2>
                  <div className="flex w-full rounded-lg bg-gray-100  mb-6">
                    <button
                      className={`flex-1 ${
                        status === "approved" && "pointer-events-none"
                      } rounded-md px-4 py-3 text-center text-base font-bold text-gray-500 transition-all ${
                        paymentMethod === "card" &&
                        "bg-sky-500 shadow-sm text-white"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      Cartão de Crédito
                    </button>
                    <button
                      className={`flex-1 ${
                        status === "approved" &&
                        "opacity-30 pointer-events-none"
                      } rounded-md px-4 py-3 text-center text-base font-bold text-gray-500 dark:text-gray-400 transition-all ${
                        paymentMethod === "pix" &&
                        "bg-sky-500 shadow-sm text-white"
                      }`}
                      onClick={() => setPaymentMethod("pix")}
                    >
                      Pix
                    </button>
                  </div>
                  {ticketDetails && paymentMethod === "card" && (
                    <CreditCardForm
                      ticketDetails={ticketDetails}
                      setcpf={setcpf}
                      cpf={cpf}
                      isValidCPF={isValidCPF}
                      setStatus={setStatus}
                      setShowModal={setShowModal}
                    />
                  )}

                  {paymentMethod === "pix" && status === "idle" && (
                    <>
                      <label className="flex flex-col">
                        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                          CPF do Titular
                          {/* <span className="text-xs font-normal">
                          {" "}
                          ( Digite seu CPF para gerar o QRcode de pagamento)
                        </span> */}
                        </p>
                        <input
                          onChange={(e) => setcpf(e.target.value)}
                          className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all`}
                          placeholder="000.000.000-00"
                          value={cpf}
                          type="text"
                          required
                        />
                      </label>
                      <p className="text-xs mt-2 text-gray-400">
                        ⚠️ Seu CPF é utilizado apenas para exibição na simulação
                        de compra. Nenhum dado é armazenado ou enviado para o
                        servidor
                      </p>
                      {loading && (
                        <div className="mt-40 text-center">
                          <div className="w-15 h-15 rounded-full border-t-2 border-sky-500 m-auto animate-spin"></div>
                          <p className="mt-5 text-xl">
                            Gerando QRcode, aguarde...
                          </p>
                        </div>
                      )}
                      {qrCode && (
                        <div className="mt-10">
                          <Image
                            src="https://api.qrserver.com/v1/create-qr-code/?data=https://example.com&size=200x200"
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="m-auto"
                          />
                          <span className="text-sm text-center block mt-4">
                            QR code fictício, click no botão "confirmar
                            pagamento"
                          </span>
                          <button
                            onClick={ResumeTicket}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-sky-500 text-white gap-2 text-xl font-bold leading-normal tracking-[0.015em] px-6 mt-4 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150 disabled:bg-sky-200"
                          >
                            Confirmar pagamento
                          </button>
                        </div>
                      )}
                      {loading ||
                        (!qrCode && (
                          <button
                            onClick={generateQR}
                            type="submit"
                            disabled={isValidCPF ? false : true}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 bg-sky-500 text-white gap-2 text-xl font-bold leading-normal tracking-[0.015em] px-6 mt-4 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150 disabled:bg-sky-200"
                          >
                            Gerar QR-code
                          </button>
                        ))}
                    </>
                  )}
                  {status === "loading" && <PaymentProcessing />}
                  {status === "denied" && paymentMethod === "pix" && (
                    <Denied setStatus={setStatus} />
                  )}
                  {status === "approved" && paymentMethod === "pix" && (
                    <Approved ticket={ticket} id={user?.uid} />
                  )}
                </div>
              </div>
            </div>
            {showModal && (
              <LoginRequiredModal onClose={() => setShowModal(false)} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

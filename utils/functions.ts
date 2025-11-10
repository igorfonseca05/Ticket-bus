import { ResumeProps, User } from "./types";
import jsPDF from "jspdf";
import QRCode  from "qrcode";
import { startTransition } from "react";
import { addTicket } from "./actions";
import { unstable_cache } from "next/cache";
import ClientPromise from "../database/db";
import { ObjectId } from "mongodb";


export function validateCPF(cpf: string): boolean {
  // Remove tudo que não for número
  cpf = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos ou se é uma sequência repetida
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== Number(cpf[9])) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;
  if (secondCheck !== Number(cpf[10])) return false;

  return true;
}


export async function paymentFunction(resume: ResumeProps) {
        return await addTicket(undefined, resume);
}


export const handleDownload = async (ticket: User | null) => {
    if (!ticket || !ticket.tickets?.length) return;
    const lastTicket = ticket.tickets[ticket.tickets.length - 1];
 
    const doc = new jsPDF();
    const qr = await QRCode.toDataURL(lastTicket._id || "fake-ticket-id");
    // Cabeçalho com logo
    try {
      doc.addImage(lastTicket.logo, "PNG", 10, 10, 30, 30);
    } catch {
      doc.setFontSize(10);
      doc.text("Logo indisponível", 10, 25);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Passagem Rodoviária", 60, 20);

    doc.setDrawColor(200);
    doc.line(10, 35, 200, 35);

    // Informações principais
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Empresa: ${lastTicket.name}`, 10, 50);
    doc.text(`Passageiro: ${ticket.name}`, 10, 60);
    doc.text(`Origem: ${lastTicket.route?.from}`, 10, 70);
    doc.text(`Destino: ${lastTicket.route?.to}`, 10, 80);
    doc.text(`Assento: ${lastTicket.seatNumber}`, 10, 90);
    doc.text(`Data: ${lastTicket.date}`, 10, 100);
    doc.text(`Forma de pagamento: ${lastTicket.paymentMethod}`, 10, 110);
    doc.text(`Preço: R$ ${lastTicket.route?.price.toFixed(2)}`, 10, 120);

    // QR Code
    doc.addImage(qr, "PNG", 150, 60, 40, 40);

    // Rodapé
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "Este bilhete é uma simulação criada para fins de portfólio.",
      10,
      140
    );
    doc.text("Não possui validade comercial.", 10, 145);

    // Salvar o arquivo
    doc.save(`passagem-${lastTicket._id}.pdf`);
  };

  export function removeUser() {
    localStorage.removeItem('user')
  }

  export function getFormatedDate(date: string) {

    if(!date) return

    const [day, month, year] = date.split("/");
    const longDate = new Date(`${year}-${month}-${day}`);

    const fomatedData = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
    }).format(new Date(longDate));

    return fomatedData
  }
  

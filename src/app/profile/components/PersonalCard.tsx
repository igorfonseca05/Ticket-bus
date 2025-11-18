"use client";

import { useState, useEffect } from "react";

interface Props {
  cpf?: string;
  phone?: string;
  address?: string;
}

export function PersonalCard({ cpf, phone, address }: Props) {

  const defaultValues = {
    cpf: cpf && cpf.trim() !== "" ? cpf : "Não informado",
    phone: phone && phone.trim() !== "" ? phone : "Não informado",
    address: address && address.trim() !== "" ? address : "Não informado",
  };

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    cpf: defaultValues.cpf,
    phone: defaultValues.phone,
    address: defaultValues.address,
  });

  // 🔵 Carregar dados do localStorage ao abrir o app
  useEffect(() => {
    const stored = localStorage.getItem("profile-info");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setForm(parsed);
      } catch {}
    }
  }, []);

  // 🔵 Salvar automaticamente no localStorage quando o form mudar
  useEffect(() => {
    localStorage.setItem("profile-info", JSON.stringify(form));
  }, [form]);

  // 🔴 Apagar tudo ao fechar o app/aba
  useEffect(() => {
    const clearOnExit = () => {
      localStorage.removeItem("profile-info");
    };

    window.addEventListener("beforeunload", clearOnExit);
    return () => window.removeEventListener("beforeunload", clearOnExit);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Salvar:", form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(defaultValues);
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white dark:bg-[#1A242E] rounded-xl p-6 shadow-sm cursor-pointer"
      onClick={() => !isEditing && setIsEditing(true)}
    >
      <h2 className="text-[#333333] dark:text-gray-100 text-[22px] font-bold pb-4">
        Informações Pessoais
      </h2>

      {!isEditing ? (
        <div className="grid grid-cols-[auto_1fr] gap-x-6">
          <div className="col-span-2 grid grid-cols-subgrid border-t py-5 border-t-gray-200 dark:border-t-[#2D3748]">
            <p className="text-[#666666] dark:text-gray-400">CPF</p>
            <p className="text-[#333333] dark:text-gray-200">{form.cpf}</p>
          </div>

          <div className="col-span-2 grid grid-cols-subgrid border-t py-5 border-t-gray-200 dark:border-t-[#2D3748]">
            <p className="text-[#666666] dark:text-gray-400">Telefone</p>
            <p className="text-[#333333] dark:text-gray-200">{form.phone}</p>
          </div>

          <div className="col-span-2 grid grid-cols-subgrid border-t py-5 border-t-gray-200 dark:border-t-[#2D3748]">
            <p className="text-[#666666] dark:text-gray-400">Endereço</p>
            <p className="text-[#333333] dark:text-gray-200">{form.address}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-400">CPF</label>
              <input
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-[#2A3542]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Telefone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-[#2A3542]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Endereço</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-[#2A3542]"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-[#5A9BDB] text-white px-4 py-2 rounded font-bold"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="underline text-gray-400"
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

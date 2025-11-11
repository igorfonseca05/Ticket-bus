"use client";

import { MapPinHouse, MapPinCheck, Calendar } from "lucide-react";
import { DateInput } from "./Calendar";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchResultsHeader from "./searchResult";
import { FormHeader } from "./formHeader";
import { useSearchParams } from "next/navigation";

export function InitForm() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [formValues, setFormValues] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [opacity, setOpacity] = useState(false);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState({ from: "", to: "", date: "" });

  useEffect(() => {
    if(searchParams.size > 0) {
      setVisible(false)
    }
    
  }, [searchParams.size])
  
  function handleChanges(
    e?:
      | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | { target: { name: string; value: string } }
  ) {
    if (!e) return;
    setFormValues({
      ...formValues,
      [e.target.name]: e?.target.value,
    });

    setError({ ...error, [e.target.name]: "" });
  }

  function handleFormVisibility() {
    setOpacity(!opacity);
    setVisible(!visible)
    // setTimeout(() => setVisible(!visible), 0);
  }


  function handleForm(e: FormEvent) {
    e.preventDefault();

    if (!formValues.from) {
      setError({ ...error, from: "Insira o local de partida" });
      return;
    }
    if (!formValues.to) {
      setError({ ...error, to: "Insira o local de chegada" });
      return;
    }
    if (!formValues.date) {
      setError({ ...error, date: "Insira a data da viagem" });
      return;
    }
    if (formValues.from === formValues.to) {
      setError({ ...error, 
        from: "A cidade de origem e destino não podem ser iguais",
        to: "A cidade de origem e destino não podem ser iguais",
      });
      return;
    }

    const data = {
      from: formValues.from,
      to: formValues.to,
      date: format(parseISO(formValues.date), "dd/MM/yyyy"),
    };

    const params = new URLSearchParams(searchParams.toString());

    params.set("from", data.from);
    params.set("to", data.to);
    params.set("date", data.date);

    // const newURL = `${window.location.pathname}?${params.toString()}`
    // window.history.pushState(null, '', newURL)
    // router.refresh()

    router.push(`?${params.toString()}`);
    handleFormVisibility();
    setFormValues({ from: "", to: "", date: "" })
  }

  return (
    <>
      {visible ? (
        <motion.div
        >
          <div className="mt-20 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5">
          {/* <FormHeader /> */}
            <form onSubmit={handleForm} className="flex flex-col gap-6 py-4">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Campo De Onde */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                    De onde você vai sair?
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
                    <MapPinHouse className="m-auto mx-4 absolute top-4 text-gray-400 group-focus-within:text-sky-500 " />

                    <select
                      name="from"
                      className={`form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 text-base font-normal leading-normal appearance-none transition-all ${
                        error.from ? "border-2 border-red-500" : ""
                      }`}
                      defaultValue=""
                      onChange={handleChanges}
                    >
                      <option value="" disabled>
                        Cidade de partida
                      </option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Brasília">Brasília</option>
                      <option value="Belo Horizonte">Belo Horizonte</option>
                      <option value="Curitiba">Curitiba</option>
                      <option value="Porto Alegre">Porto Alegre</option>
                      <option value="Salvador">Salvador</option>
                      <option value="Recife">Recife</option>
                      <option value="Fortaleza">Fortaleza</option>
                      <option value="Manaus">Manaus</option>
                      <option value="Belém">Belém</option>
                      <option value="Goiânia">Goiânia</option>
                      <option value="Natal">Natal</option>
                      <option value="João Pessoa">João Pessoa</option>
                      <option value="São Paulo">São Paulo</option>
                    </select>
                  </div>
                  {error.from && (
                    <motion.p
                      className="text-xs text-red-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error.from}
                    </motion.p>
                  )}
                </label>

                {/* Campo Para Onde */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
                    Para onde você vai?
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
                    <MapPinHouse className="m-auto mx-4 absolute top-4 text-gray-400 group-focus-within:text-sky-500 " />

                    <select
                      name="to"
                      className={`form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-14 text-base font-normal leading-normal appearance-none transition-all ${
                        error.to ? "border-2 border-red-500" : ""
                      }`}
                      defaultValue=""
                      onChange={handleChanges}
                    >
                      <option value="" disabled>
                        Cidade de destino
                      </option>
                      <option value="Rio de Janeiro">Rio de Janeiro</option>
                      <option value="Brasília">Brasília</option>
                      <option value="Belo Horizonte">Belo Horizonte</option>
                      <option value="Curitiba">Curitiba</option>
                      <option value="Porto Alegre">Porto Alegre</option>
                      <option value="Salvador">Salvador</option>
                      <option value="Recife">Recife</option>
                      <option value="Fortaleza">Fortaleza</option>
                      <option value="Manaus">Manaus</option>
                      <option value="Belém">Belém</option>
                      <option value="Goiânia">Goiânia</option>
                      <option value="Natal">Natal</option>
                      <option value="João Pessoa">João Pessoa</option>
                      <option value="São Paulo">São Paulo</option>
                    </select>
                  </div>
                  {error.to && (
                    <motion.p
                      className="text-xs text-red-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error.to}
                    </motion.p>
                  )}
                </label>
              </div>

              {/* Campo Quando */}
              <DateInput error={error} handleChanges={handleChanges} />

              {/* Botão de Busca */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-sky-500 text-white gap-2 text-lg font-bold leading-normal tracking-[0.015em] px-6 mt-4 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150"
              >
                Buscar Passagens
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <SearchResultsHeader handleFormVisibility={handleFormVisibility} />
      )}
    </>
  );
}

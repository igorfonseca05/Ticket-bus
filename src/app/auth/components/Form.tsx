"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState, useEffect } from "react";

import { signup, FormState } from "../../../../utils/actions"
import { useRouter } from "next/navigation";

const initialState: FormState = {
  errors: undefined,
  userData: { name: "", email: "", uid: ''},
  message: "",
  redirectTo: ''
};

export function Form() {

  const router = useRouter()
  
  const [state, action, pendind] = useActionState(signup, initialState);
  const [visibleInputOne, setVisibleinputOne] = useState(false);
  const [visibleInputTwo, setVisibleinputTwo] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.message) {
      setMessage(state.message);

      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [state.message]);
  
  useEffect(() => {
    if(state.redirectTo) {
      router.push(`${state.redirectTo}`)
    }

  }, [state.redirectTo]);
  console.log(state)

  return (
    <form action={action} className=" flex flex-col gap-2">
      {state.message && (
        <p className="text-red-500 text-sm">
          {message}
        </p>
      )}
      <label className="flex flex-col w-full">
        <p className="text-gray-900 dark:text-gray-200 text-base font-medium leading-normal pb-2">
          Nome completo
        </p>
        <input
          name="name"
          className="form-input flex w-full resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-blue-600 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-10 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal"
          placeholder="Digite seu nome completo"
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-500">{state.errors.name}</p>
        )}
      </label>
      <label className="flex flex-col w-full">
        <p className="text-gray-900 dark:text-gray-200 text-base font-medium leading-normal pb-2">
          E-mail
        </p>
        <input
          name="email"
          className="form-input flex w-full resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-blue-600 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-10 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal"
          placeholder="exemplo@email.com"
        />
      </label>
      {state?.errors?.email && (
        <p className="text-xs text-red-500">{state.errors.email}</p>
      )}
      <label className="flex flex-col w-full">
        <p className="text-gray-900 dark:text-gray-200 text-base font-medium leading-normal pb-2">
          Senha
        </p>
        <div className="flex w-full items-stretch relative">
          <input
            name="password"
            className="form-input flex w-full resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-blue-600 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-10 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal"
            placeholder="Crie uma senha forte"
            type={visibleInputOne ? "text" : "password"}
          />
          {!visibleInputOne && (
            <EyeOff
              onClick={() => setVisibleinputOne(!visibleInputOne)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
          {visibleInputOne && (
            <Eye
              onClick={() => setVisibleinputOne(!visibleInputOne)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
        </div>
      </label>
      {state?.errors?.password && (
        <p className="text-xs text-red-500">{state.errors.password}</p>
      )}
      <label className="flex flex-col w-full">
        <p className="text-gray-900 dark:text-gray-200 text-base font-medium leading-normal pb-2">
          Confirmar senha
        </p>
        <div className="flex w-full items-stretch relative">
          <input
            className="form-input flex w-full resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-blue-600 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-10 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 text-base font-normal leading-normal"
            placeholder="Repita sua senha"
            type={visibleInputTwo ? "text" : "password"}
            name="confirmPassword"
          />
          {!visibleInputTwo && (
            <EyeOff
              onClick={() => setVisibleinputTwo(!visibleInputTwo)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
          {visibleInputTwo && (
            <Eye
              onClick={() => setVisibleinputTwo(!visibleInputTwo)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
        </div>
      </label>
      {/* {state?.errors?.confirmPassword && (
        <p className="text-xs text-red-500">{state.errors.confirmPassword}</p>
      )} */}
      <button
        disabled={pendind}
        className="flex items-center justify-center font-semibold text-base text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 h-10 w-full rounded-lg mt-4 transition-colors"
      >
        {pendind ? "Aguarde..." : "Criar conta"}
      </button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Já tem uma conta?
        <a className="font-semibold text-blue-600 hover:underline" href="#">
          Entrar
        </a>
      </p>
    </form>
  );
}

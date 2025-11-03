"use client";
import { User, Mail, LockIcon, RectangleEllipsis } from "lucide-react";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState, useEffect } from "react";

import { signup, FormState } from "../../../../../utils/actions";
import { useRouter } from "next/navigation";

import { useUser } from "../../../../../context/UserContext";

const initialState: FormState = {
  errors: undefined,
  userData: { name: "", email: "" , uid: ""},
  message: "",
  redirectTo: "",
};

export function FormCadastro() {
  const router = useRouter();
  const {setUser} = useUser()

  const [state, action, pendind] = useActionState(signup, initialState);
  const [visibleInputOne, setVisibleinputOne] = useState(false);

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
    if (state.redirectTo && state.userData) {
    
      setUser(state.userData)
      router.push(`${state.redirectTo}`);
    }
  }, [state.redirectTo, state.userData]);

  return (
    <form action={action} className="flex flex-col gap-4">
      {state.message && <p className="text-red-500 text-sm">{message}</p>}
      <label className="flex flex-col">
        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
          Nome Completo
        </p>
        <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
          {/* 'group-focus-within:ring-primary' -> 'group-focus-within:ring-blue-500' */}
          <User className="m-auto mx-4 absolute top-3 text-gray-400 group-focus-within:text-sky-500 " />

          {/* 'focus:ring-primary' -> 'focus:ring-blue-500' */}
          <input
            name="name"
            className="form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 text-base font-normal leading-normal appearance-none transition-all "
            placeholder="Digite seu nome completo"
            type="text"
            defaultValue=""
          />
        </div>
        {state?.errors?.name && (
          <p className="text-xs text-red-500">{state.errors.name}</p>
        )}
      </label>
      <label className="flex flex-col">
        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
          E-mail
        </p>
        <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
          {/* 'group-focus-within:ring-primary' -> 'group-focus-within:ring-blue-500' */}
          <Mail className="m-auto mx-4 absolute top-3 text-gray-400 group-focus-within:text-sky-500 " />
          {/* 'focus:ring-primary' -> 'focus:ring-blue-500' */}
          <input
            name="email"
            className="form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 text-base font-normal leading-normal appearance-none transition-all "
            placeholder="Digite seu e-mail"
            type="email"
            defaultValue=""
          />
        </div>
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
      </label>
      <label className="flex flex-col">
        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
          Senha
        </p>
        <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
          {/* 'group-focus-within:ring-primary' -> 'group-focus-within:ring-blue-500' */}
          <LockIcon className="m-auto mx-4 absolute top-3 text-gray-400 group-focus-within:text-sky-500 " />
          {/* 'focus:ring-primary' -> 'focus:ring-blue-500' */}
          <input
            name="password"
            className="form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 text-base font-normal leading-normal appearance-none transition-all "
            placeholder="Crie uma senha forte"
            type={visibleInputOne ? "text" : "password"}
            defaultValue=""
          />
          {!visibleInputOne && (
            <Eye
              onClick={() => setVisibleinputOne(!visibleInputOne)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
          {visibleInputOne && (
            <EyeOff
              onClick={() => setVisibleinputOne(!visibleInputOne)}
              size={20}
              className="absolute right-4 top-3"
            />
          )}
        </div>
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password}</p>
        )}
      </label>

      <button
        disabled={pendind}
        className="flex w-full mt-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-sky-500 text-white gap-2 text-lg font-bold leading-normal tracking-[0.015em] px-6 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150"
      >
        {pendind ? "Aguarde..." : "Criar conta"}
      </button>
    </form>
  );
}

"use client";

import { LockIcon, Mail } from "lucide-react";
import { ErrorForms, loginFormAction } from "../../../../../utils/actions";
import { useActionState, useEffect, useState } from "react";
import { FormLoginState } from "../../../../../utils/actions";
import { useUser } from "../../../../../context/UserContext";
import { useRouter } from "next/navigation";
import { ErroComponent } from "@/app/inicio/components/erroComponent";

const formState: FormLoginState = {
  errors: { email: [], password: [] },
  redirectTo: "",
  message: "",
  userData: { email: "", uid: "", name: "" },
};

export function LoginForm() {
  const { setUser } = useUser();
  const router = useRouter();

  const [state, action, pending] = useActionState(loginFormAction, formState);
  const [formErros, setFormErros] = useState<ErrorForms | null>(null);

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setFormErros({
      ...formErros,
      [e.target.name]: "",
    });
  }

  useEffect(() => {
    if (state.errors) {
      return setFormErros(state.errors);
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.userData?.email) {
      const ticket = localStorage.getItem("ticket");

      if (ticket) {
        const { ticketDetails } = JSON.parse(ticket);
        const expired = Date.now() - ticketDetails.timestamp > 5 * 60 * 1000;

        setUser(state.userData);
        expired ? router.push(`/inicio`) : router.push(`/payment`);
      } else {
        setUser(state.userData);
        router.push(`${state.redirectTo}`);
      }
    }
  }, [state.userData]);

  return (
    <form action={action} className="flex flex-col gap-y-3 ">
      <label className="flex flex-col h-auto">
        <p className="text-gray-800 dark:text-gray-200 text-lg  font-medium leading-normal pb-2">
          E-mail
        </p>
        <div className="flex w-full flex-1 rounded-lg group relative">
          <Mail className="m-auto mx-4 absolute top-3 text-gray-400 group-focus-within:text-sky-500" />

          <input
            name="email"
            className="form-input flex pl-12 w-full min-w-0 flex-1  overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 text-base font-normal leading-normal appearance-none transition-all "
            placeholder="Digite seu e-mail"
            type="email"
            onChange={handleInputs}
          />
        </div>
        {formErros?.email && (
          <p className="text-xs text-red-500 mt-2">{formErros.email}</p>
        )}
      </label>
      <label className="flex flex-col h-auto">
        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-normal pb-2">
          Senha
        </p>
        <div className="flex w-full flex-1 items-stretch rounded-lg group relative">
          <LockIcon className="m-auto mx-4 absolute top-3 text-gray-400 group-focus-within:text-sky-500" />
          <input
            name="password"
            className="form-input flex pl-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 h-12 text-base font-normal leading-normal appearance-none transition-all "
            placeholder="Digite sua senha"
            type="password"
            onChange={handleInputs}
          />
        </div>
        {formErros?.password && (
          <p className="text-xs text-red-500 mt-2">{formErros.password}</p>
        )}
      </label>
      <div className="text-right">
        <a
          className="text-base font-medium text-sky-500 hover:underline"
          href="#"
        >
          Esqueci minha senha
        </a>
      </div>
      <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-sky-500 text-white gap-2 text-lg font-bold leading-normal tracking-[0.015em] px-6 hover:bg-opacity-90 active:scale-[0.98] transition-all duration-150">
        Entrar{" "}
      </button>
      {state.message && (
        <p className="text-md text-red-500 mt-2">{state.message}</p>
      )}
    </form>
  );
}

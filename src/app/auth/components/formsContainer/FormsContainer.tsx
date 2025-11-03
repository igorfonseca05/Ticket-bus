"use client";

import { useState } from "react";
import { FormAuthHeader } from "../header/FormAuthHeader";
import { Mail, LockIcon } from "lucide-react";
import { FormCadastro } from "../cadastro/FormCadastro";
import { motion } from "framer-motion";
import { LoginForm } from "../loginForm/LoginForm";

export function FormsContainer() {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");

  return (
    <motion.div
      className="flex w-full max-w-lg justify-self-center lg:justify-self-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-black/5 dark:border-white/5">
        <FormAuthHeader setActiveForm={setActiveForm} activeForm={activeForm} />
        <div className="text-center mb-3">
          <h1 className="text-sky-500 dark:text-white text-4xl sm:text-2xl font-black leading-tight tracking-[-0.033em]">
                {activeForm === 'login'? 'Acesse sua Conta' : 'Crie sua Conta'}
              </h1>
        </div>
        {activeForm === "login" ? <LoginForm/> : <FormCadastro />}
      </div>
    </motion.div>
  );
}

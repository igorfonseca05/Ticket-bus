"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUser } from "../../../../context/UserContext";
import { startTransition } from "react";
import { deleteSession } from "../../../../utils/actions";
import { usePathname } from "next/navigation";

type User = {
  name: string;
  photoURL?: string;
  uid: string
};

export function UserSection() {
  const {user, clearUser} = useUser()

  const path = usePathname()

  return (
    <>
      {user ? (
         <UserInfo user={user} clearUser={clearUser} />
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/auth"
            className={`sm:inline px-4 py-2 rounded-md bg-sky-500 text-white`}
          >
            Entrar
          </Link>
        </div>
      )}
    </>
  );
}

function UserInfo({ user, clearUser }: { user: User , clearUser: () => void }) {
  const [open, setOpen] = useState(false);

  function handleLogout() {
    startTransition(async () => {
      deleteSession();
      clearUser();
    });
  }

  // 🔹 Lógica para mostrar primeiro nome ou nome composto
  const displayName = (() => {
    const parts = user.name.trim().split(" ");
    if (parts.length === 1) return parts[0];
    if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
    return user.name;
  })();

  return (
    <div className="relative">
      {/* Avatar + Nome */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer focus:outline-none"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 shadow-sm">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Nome */}
        <span className="capitalize font-medium text-gray-800">
          {displayName}
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
          >
            <Link
              href={`/profile/${user.uid}`}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Meu perfil
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleLogout()
                setOpen(false);
              }}
            >
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

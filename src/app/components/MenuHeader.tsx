import Link from "next/link";
import { UserSection } from "../inicio/components/UserSection";

export function MenuHeader({path}: { path: string }) {
  return (
    <header className={`fixed z-10 top-0 right-0 left-0 flex items-center justify-between whitespace-nowrap dark:border-b-white/10 px-4  sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 dark:bg-gray-800 ${path !== '/inicio' && "bg-white" }`}>
      <Link href={"/inicio"}>
        <div className={`flex items-center gap-4 ${path === '/inicio' && "text-white" } text-sky-500 `}>
          <div className="size-8">
            {/* Ícone de Logo (SVG) */}
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
            </svg>
          </div>
          <h2 className={`${path === '/inicio' && "text-white" } text-sky-500 hidden sm:block text-xl font-bold leading-tight tracking-[-0.015em]`}>
            Passagem Sênior
          </h2>
        </div>
      </Link>
      <UserSection />
    </header>
  );
}

import { UserProvider } from "../../../context/UserContext";
import '../../app/globals.css'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     {children}
     </>
  );
}

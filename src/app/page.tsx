import Image from "next/image";
import { Form } from "./components/Form";

export default function Home() {


  return (
    <div className="bg-blue-200">
       <div className="relative flex min-h-screen w-full flex-col items-center justify from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full justify-center grow flex-col w-full max-w-md p-4 sm:p-6 lg:p-8">
            <div className="layout-content-container bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-6 h-fit">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  <div className="text-center mb-4">
                    <p className="text-gray-900 dark:text-white text-2xl font-extrabold leading-tight tracking-[-0.033em]">
                      Crie sua conta
                    </p>
                  </div>
                  <Form/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

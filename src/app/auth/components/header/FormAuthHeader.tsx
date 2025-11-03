
interface FormHeaderProps {
  activeForm: string
  setActiveForm:  React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}

export function FormAuthHeader({setActiveForm, activeForm}: FormHeaderProps) {
  return (
    <div className="flex w-full rounded-lg bg-gray-100  mb-6">
      <button className={`flex-1 rounded-md px-4 py-3 text-center text-base font-bold text-gray-500 transition-all ${activeForm === 'login' && 'bg-sky-500 shadow-sm text-white'}`}
      onClick={() => setActiveForm('login')}>
        Entrar
      </button>
      <button className={`flex-1 rounded-md px-4 py-3 text-center text-base font-bold text-gray-500 dark:text-gray-400 transition-all 
      ${activeForm === 'signup' && 'bg-sky-500 shadow-sm text-white'}`}
      onClick={() => setActiveForm('signup')}>
        Cadastrar
      </button>
    </div>
  );
}

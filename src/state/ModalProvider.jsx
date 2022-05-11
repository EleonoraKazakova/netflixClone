import { useContext, createContext, useState } from "react";

const Context = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const value = { modal, setModal };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useModal() {
  const context = useContext(Context);
  const errorText =
    "To use useUID(), wrap the parent component with <ModalProvider/>";

  if (!context) throw new Error(errorText);

  return context;
}

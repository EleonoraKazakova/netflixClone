import { useContext, createContext, useState } from "react";

const Context = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const value = { content, setContent };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContent() {
  const context = useContext(Context);
  const errorText =
    "To use useUID(), wrap the parent component with <ContentProvider/>";

  if (!context) throw new Error(errorText);

  return context;
}

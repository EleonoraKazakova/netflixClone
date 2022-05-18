import { useContext, createContext, useState, useEffect } from "react";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";

const Context = createContext(null);

export function UIDProvider({ children }) {
  const [uid, setUID] = useState(null);
  const [user, setUser] = useState({});

  const currentUser =
    authentication.currentUser === null ? null : authentication.currentUser.uid;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setUser(data);
    }
    loadData(`users/${currentUser}`);
  }, user);

  const value = { uid, setUID, user };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUID() {
  const context = useContext(Context);
  const errorText =
    "To use useUID(), wrap the parent component with <UIDProvider/>";

  if (!context) throw new Error(errorText);

  return context;
}

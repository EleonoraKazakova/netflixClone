import { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../state/ModalProvider";

export default function UserPage() {
  const { setModal } = useModal();

  function modalMessage() {
    setModal("Eleonora");
  }

  return (
    <div>
      Hello user!
      <button onClick={modalMessage}>Click</button>
    </div>
  );
}

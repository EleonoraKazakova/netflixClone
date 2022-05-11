import { useState } from "react";
import Modal from "./Modal";

export default function UserPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      Hello user!
      <button onClick={() => setIsOpen(true)}>Click</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        'Hello world!'
      </Modal>
    </div>
  );
}

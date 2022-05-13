import "../styles/modal.sass";
import ReactDOM from "react-dom";
import Xmark from "../images/xmark.svg";
import { useModal } from "../state/ModalProvider";
import InputField from "./InputField";
import createForm from "../data/createForm.json";

export default function Modal() {
  const { modal, setModal } = useModal();

  if (modal === null) return null;

  function onCreate(event) {
    event.preventDefault();
    modal[3]();
    setModal(null);
  }

  return ReactDOM.createPortal(
    <section>
      <div className="modal-overlay" />
      <div className="modal-styles">
        <div className="modal-name-tech">{modal}</div>

        <img
          onClick={() => setModal(null)}
          src={Xmark}
          className="modal-mark"
        />
      </div>
    </section>,
    document.getElementById("portal")
  );
}

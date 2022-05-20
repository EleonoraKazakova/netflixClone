import "../styles/modal.sass";
import ReactDOM from "react-dom";
import Xmark from "../images/xmark.svg";
import { useModal } from "../state/ModalProvider";

export default function Modal() {
  const { modal, setModal } = useModal();

  if (modal === null) return null;

  return ReactDOM.createPortal(
    <section>
      <div className="modal-overlay" />

      <div className="modal-styles">
        <div>
          <div className="modal-name-tech">{modal}</div>
          <img
            onClick={() => setModal(null)}
            src={Xmark}
            className="modal-mark"
          />
        </div>
      </div>
    </section>,
    document.getElementById("portal")
  );
}

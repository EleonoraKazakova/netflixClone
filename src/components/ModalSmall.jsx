import "../styles/modal.sass";
import ReactDOM from "react-dom";
import Xmark from "../images/xmark.svg";
import { useModalSmall } from "../state/ModalProviderSmall";

export default function Modal() {
  const { modalSmall, setModalSmall } = useModalSmall();

  if (modalSmall === null) return null;

  return ReactDOM.createPortal(
    <section>
      <div className="modal-overlay" />

      <div className="modal-styles">
        <div>
          <div className="modal-name-tech">{modalSmall}</div>
          <img
            onClick={() => setModalSmall(null)}
            src={Xmark}
            className="modal-mark"
          />
        </div>
      </div>
    </section>,
    document.getElementById("portal")
  );
}

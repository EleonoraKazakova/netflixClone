import "../styles/modal.sass";
import ReactDOM from "react-dom";
import Xmark from "../images/xmark.svg";

export default function Modal({ children, open, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <section>
      <div className="modal-overlay" />
      <div className="modal-styles">
        <div className="modal-name-tech">{children}</div>
        <img onClick={onClose} src={Xmark} className="modal-mark" />
      </div>
    </section>,
    document.getElementById("portal")
  );
}

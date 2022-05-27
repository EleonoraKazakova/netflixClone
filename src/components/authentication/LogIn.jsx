import InputField from "../InputField";
import form from "../../data/logInForm.json";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../scripts/firebaseAuth";
import { useUID } from "../../state/UIDProvider";
import "../../styles/login.sass";

export default function LogIn() {
  const navigate = useNavigate();
  const { setUID } = useUID();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin(event) {
    event.preventDefault();
    try {
      const returningUID = await loginUser(email.trim(), password);

      if (returningUID) {
        setUID(returningUID);
        navigate("/");
      }
    } catch (error) {
      alert("Could not login, try again");
    }
  }

  return (
    <div className="login-grid">
      <div className="login-content">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={onLogin} className="login-form">
          <InputField setup={form.email} state={[email, setEmail]} />
          <InputField setup={form.password} state={[password, setPassword]} />
          <div className="login-button">
            <button className="button-small">Sign in</button>
          </div>
        </form>
        <div className="login-block">
          <p className="login-title">
            New to Netflix? <Link to="/signup">Sign up now</Link>
          </p>
        </div>
        <div className="login-block">
          <Link to="/recover-password">Need help?</Link>
        </div>
      </div>
    </div>
  );
}

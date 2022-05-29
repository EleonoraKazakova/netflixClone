import InputField from "../InputField";
import form from "../../data/recoverPasswordForm.json";
import { useState } from "react";
import { recoverUser } from "../../scripts/firebaseAuth";
import Footer from "../Footer";
import NavigationBarUnloged from "../NavigationBarUnloged";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  async function onRecover(event) {
    event.preventDefault();
    await recoverUser(email);
    alert(`We sent an email to ${email}`);
  }

  return (
    <>
      <NavigationBarUnloged />
      <main className="login-grid">
        <div className="login-content-light">
          <h2>Please login to access to our platform.</h2>
          <form onSubmit={onRecover} className="login-form">
            <InputField setup={form.email} state={[email, setEmail]} />

            <div className="login-button">
              <button className="button-small">Recover password</button>
            </div>
          </form>
        </div>
      </main>
      <Footer light={true} />
    </>
  );
}

import { useState } from "react";
import { createUser } from "../../scripts/firebaseAuth";
import { addDocumentWithId } from "../../scripts/fireStore";
import InputField from "../InputField";
import form from "../../data/signUpForm.json";
import { useNavigate } from "react-router-dom";
import { useUID } from "../../state/UIDProvider";
import "../../styles/login.sass";
import Footer from "../Footer";
import NavigationBarUnloged from "../NavigationBarUnloged";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUID } = useUID();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onCreate(event) {
    event.preventDefault();

    const newUID = await createUser(email, password);

    const newUser = { name: name, role: "user" };

    const payload = await addDocumentWithId("users", newUID, newUser);

    if (payload.error) {
      alert("Couldn't create user");
    } else {
      setUID(newUID);
      navigate("/");
    }
  }

  return (
    <>
      <NavigationBarUnloged />
      <main className="login-grid">
        <div className="login-content-light">
          <h1>Create account</h1>
          <form onSubmit={onCreate} className="login-form">
            <InputField setup={form.name} state={[name, setName]} />
            <InputField setup={form.email} state={[email, setEmail]} />
            <InputField setup={form.password} state={[password, setPassword]} />
            <div className="login-button">
              <button className="button-small">Submit</button>
            </div>
          </form>
        </div>
      </main>
      <Footer light={true} />
    </>
  );
}

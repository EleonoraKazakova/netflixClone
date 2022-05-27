import { Route, Routes } from "react-router-dom";
import RecoverPassword from "../components/authentication/RecoverPasssword";
import SignUp from "../components/authentication/SignUp";
import NavigationBarUnloged from "../components/NavigationBarUnloged";
import WelcomePage from "../components/WelcomePage";
import "../styles/footer.sass";

export default function UnLoggedRoutes() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </section>
  );
}

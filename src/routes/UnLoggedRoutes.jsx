import { Routes, Route } from "react-router-dom";
import LogIn from "../components/authentication/LogIn";
import WelcomePage from "../components/WelcomePage";
import RecoverPassword from "../components/authentication/RecoverPasssword";
import SignUp from "../components/authentication/SignUp";
import AdminPage from "../components/AdminPage";

export default function UnLoggedRoutes() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </section>
  );
}

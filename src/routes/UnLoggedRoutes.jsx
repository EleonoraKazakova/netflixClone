import { Routes, Route } from "react-router-dom";
import LogIn from "../components/authentication/LogIn";
import WelcomePage from "../components/WelcomePage";
import RecoverPassword from "../components/authentication/RecoverPasssword";
import SignUp from "../components/authentication/SignUp";
import Footer from "../components/Footer";
import NavigationBarUnloged from "../components/NavigationBarUnloged";

export default function UnLoggedRoutes() {
  return (
    <section>
      <NavigationBarUnloged />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
      <Footer />
    </section>
  );
}

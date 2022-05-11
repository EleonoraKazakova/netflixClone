import { Routes, Route } from "react-router-dom";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import { useState, useEffect } from "react";

import UserPage from "../components/UserPage";
import "../styles/lougedRoutes.sass";

export default function LoggedRoutes() {
  const currentUser = authentication.currentUser.uid;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setUser(data);
    }
    loadData(`users/${currentUser}`);
  }, []);

  return (
    <section className="lougedRoutes-grid">
      <div className="lougedRoutes-content">
        <Routes>
          <Route path="/" element={<UserPage />} />
        </Routes>
      </div>
    </section>
  );
}

import { Routes, Route } from "react-router-dom";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import { useState, useEffect } from "react";
import AdminPage from "../components/admin/AdminPage";
import UserPage from "../components/user/UserPage";
import "../styles/lougedRoutes.sass";
import SeriesPage from "../components/admin/SeriesPage";

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
          <Route path="/" element={<AdminPage />} />
          <Route path="admin/series/:seriesTitle" element={<SeriesPage />} />
          <Route path="user-page" element={<UserPage />} />
        </Routes>
      </div>
    </section>
  );
}

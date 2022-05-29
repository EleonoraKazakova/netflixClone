import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../components/admin/AdminPage";
import SeriesPage from "../components/admin/SeriesPage";
import Footer from "../components/Footer";
import NavigationBar from "../components/user/NavigationBar";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import "../styles/lougedRoutes.sass";

export default function LoggedRoutes() {
  return (
    <div className="lougedRoutes-grid">
      <NavigationBar menu={false} />
      <div className="lougedRoutes-content">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="admin/series/:seriesTitle" element={<SeriesPage />} />
        </Routes>
      </div>
      <div className="lougedRoutes-footer">
        <Footer light={false} />
      </div>
    </div>
  );
}

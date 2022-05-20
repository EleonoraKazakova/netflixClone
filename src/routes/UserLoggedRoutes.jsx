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
import VideoPage from "../components/user/VideoPage";

export default function UserLoggedRoutes() {
  return (
    <section className="lougedRoutes-grid">
      <div className="lougedRoutes-content">
        <Routes>
          <Route path="/:category/:videoID" element={<VideoPage />} />
          <Route path="/" element={<UserPage />} />
        </Routes>
      </div>
    </section>
  );
}

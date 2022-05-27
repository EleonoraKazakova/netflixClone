import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import CategoryPage from "../components/user/CategoryPage";
import EpisodePage from "../components/user/EpisodePage";
import NavigationBar from "../components/user/NavigationBar";
import SearchedVideo from "../components/user/SearchedVideo";
import UserPage from "../components/user/UserPage";
import VideoPage from "../components/user/VideoPage";
import "../styles/lougedRoutes.sass";

export default function UserLoggedRoutes() {
  return (
    <section className="lougedRoutes-grid">
      <NavigationBar />
      <div className="lougedRoutes-content">
        <Routes>
          <Route
            path="/:category/:seriesID/:episodeID"
            element={<EpisodePage />}
          />
          <Route path="/:category/:videoID" element={<VideoPage />} />
          <Route path="/search/:videoTitle" element={<SearchedVideo />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/" element={<UserPage />} />
        </Routes>
      </div>
      <div className="lougedRoutes-footer">
        <Footer light={false} />
      </div>
    </section>
  );
}

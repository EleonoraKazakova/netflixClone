import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "../../styles/navigation-bar.sass";
import { useUID } from "../../state/UIDProvider";
import Profile from "../../images/profile.jpg";
import { useState, useEffect } from "react";
import { getCollection } from "../../scripts/fireStore";
import Searching from "./Searching";
import "../../styles/user-page.sass";

export default function NavigationBar() {
  const { uid, user, setUID } = useUID();
  const [openProfile, setOpenProfile] = useState(false);

  const [categories, setCategories] = useState([]);
  const path = "netflixClone";

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCategories(data);
    }
    loadData(path);
  }, []);

  const userName = uid !== null ? <p>{user.name}</p> : null;
  const userLogo =
    uid !== null ? (
      <img src={Profile} className="navigation-bar-profile" />
    ) : null;

  return (
    <div className="navigation-bar-content">
      <div className="navigation-bar-menu">
        <Link to="/">
          <img src={Logo} className="navigation-bar-logo" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/series">Series</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/documentaries">Documentaries</Link>
      </div>
      <div className="navigation-bar-right">
        <Searching categories={categories} />
        <div className="navigation-bar-dropdown">
          <div onClick={() => setOpenProfile(!openProfile)}>{userLogo}</div>
          {openProfile && (
            <div className="navigation-bar-dropdown-content">
              <p className="navigation-bar-dropdown-link">{userName}</p>
              <p
                onClick={() => setUID(null)}
                className="navigation-bar-dropdown-link"
              >
                Sign out of Netflix
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

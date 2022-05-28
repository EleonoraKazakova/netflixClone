import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import Profile from "../../images/profile.jpg";
import { getCollection } from "../../scripts/fireStore";
import { useUID } from "../../state/UIDProvider";
import "../../styles/navigation-bar.sass";
import "../../styles/user-page.sass";
import Searching from "./Searching";

export default function NavigationBar({ menu }) {
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
    <div
      className={
        menu ? "navigation-bar-content" : "navigation-bar-content-admin"
      }
    >
      <Link to="/">
        <img src={Logo} className="navigation-bar-logo" />
      </Link>
      {menu && (
        <div className="navigation-bar-menu">
          <Link to="/">Home</Link>
          <Link to="/series">Series</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/documentaries">Documentaries</Link>
        </div>
      )}
      <div className="navigation-bar-right">
        {menu && <Searching categories={categories} />}
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

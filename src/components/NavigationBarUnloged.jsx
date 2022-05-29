import Logo from "../images/logo.png";
import "../styles/navigation-bar.sass";
import { Link } from "react-router-dom";

export default function NavigationBarUnloged() {
  return (
    <nav className="navigation-bar-unloged">
      <Link to="/">
        <img src={Logo} className="navigation-bar-logo" />
      </Link>
    </nav>
  );
}

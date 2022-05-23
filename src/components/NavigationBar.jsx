import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import "../styles/navigation-bar.sass";

export default function NavigationBar() {
  return (
    <div className="navigation-bar-content">
      <img src={Logo} className="navigation-bar-logo" />
      <Link to="/">Home</Link>
      <Link to="/">Series</Link>
      <Link to="/">Movies</Link>
      <Link to="/">Documentaries</Link>
    </div>
  );
}

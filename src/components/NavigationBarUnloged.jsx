import Logo from "../images/logo.png";
import "../styles/navigation-bar.sass";

export default function NavigationBarUnloged() {
  return (
    <div className="navigation-bar-unloged">
      <img src={Logo} className="navigation-bar-logo" />
    </div>
  );
}

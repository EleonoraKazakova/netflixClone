import "../styles/welcome-page.sass";
import LogIn from "./authentication/LogIn";

export default function WelcomePage() {
  return (
    <div className="welcome-page-background">
      <LogIn />
    </div>
  );
}

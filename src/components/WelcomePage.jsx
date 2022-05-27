import "../styles/welcome-page.sass";
import LogIn from "./authentication/LogIn";
import Footer from "./Footer";
import NavigationBarUnloged from "./NavigationBarUnloged";

export default function WelcomePage() {
  return (
    <>
      <div className="welcome-page-background">
        <NavigationBarUnloged />
        <LogIn />
      </div>
      <Footer light={false} />
    </>
  );
}

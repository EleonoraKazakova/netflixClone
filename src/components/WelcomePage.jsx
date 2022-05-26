import "../styles/welcome-page.sass";
import LogIn from "./authentication/LogIn";
import Footer from "./Footer";

export default function WelcomePage() {
  return (
    <>
      <div className="welcome-page-background">
        <LogIn />
      </div>
      <Footer light={false} />
    </>
  );
}

import LoggedRoutes from "./routes/LoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import logo from "./logo.svg";
import "./App.css";

export function App() {
  const { uid } = useUID();
  return (
    <div className="App">
      <BrowserRouter>
        <main className="app-content ">
          {uid && <LoggedRoutes />}
          {!uid && <UnLoggedRoutes />}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

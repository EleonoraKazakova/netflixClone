import LoggedRoutes from "./routes/LoggedRoutes";
import LoggedRoutesUser from "./routes/LoggedRoutesUser";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import "./styles/App.css";
import Modal from "./components/Modal";
import { ModalProvider } from "./state/ModalProvider";
import { ContentProvider } from "./state/ContentProvider";

export function App() {
  const { uid } = useUID();
  return (
    <div className="App">
      <ModalProvider>
        <ContentProvider>
          <BrowserRouter>
            <main className="app-content ">
              {uid && <LoggedRoutes />}

              {!uid && <UnLoggedRoutes />}
            </main>
          </BrowserRouter>
          <Modal />
        </ContentProvider>
      </ModalProvider>
    </div>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal";
import AdminLoggedRoutes from "./routes/AdminLoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
import UserLoggedRoutes from "./routes/UserLoggedRoutes";
import { ModalProvider } from "./state/ModalProvider";
import { useUID } from "./state/UIDProvider";
import "./styles/App.sass";

export function App() {
  const { uid, user } = useUID();

  return (
    <div className="App">
      <ModalProvider>
        <BrowserRouter>
          <div className="app-content ">
            {!uid && <UnLoggedRoutes />}
            {uid && user.role === "admin" && <AdminLoggedRoutes />}
            {uid && user.role === "user" && <UserLoggedRoutes />}
          </div>
          <Modal />
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;

import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UIDProvider } from "./state/UIDProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <UIDProvider>
    <App />
  </UIDProvider>
);

reportWebVitals();

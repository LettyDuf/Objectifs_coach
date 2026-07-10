import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./ui/App";
import "./ui/tokens.css";
import "./ui/layout/layout.css";
import "./ui/styles/index.css";

// Version visible dans l'onglet : sert à vérifier qu'on regarde le bon build.
if (typeof __BUILD_STAMP__ === "string") {
  document.title = `Coach Objectifs · build ${__BUILD_STAMP__}`;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

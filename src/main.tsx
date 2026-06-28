import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./ui/App";
import "./ui/tokens.css";
import "./ui/layout/layout.css";
import "./ui/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

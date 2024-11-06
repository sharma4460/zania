import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (process.env.NODE_ENV === "development") {
  import("./api/api.ts").then(({ worker }) => {
    worker.start({ onUnhandledRequest: "bypass" });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, suiLight } from "@ringcentral/spring-ui";
import "@ringcentral/spring-ui/index.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={suiLight}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "@/styles/global-styled";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

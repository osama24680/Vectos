import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// global styles first, so component stylesheets (imported through App) can override the template
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "./sass/index.scss";
import "./styles/theme.css";
import App from "./App";
import { ShoesProvider } from "./Store/contextAPI.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoesProvider>
        <App />
      </ShoesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

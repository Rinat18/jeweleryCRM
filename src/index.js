import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import StaffContext from "./context/StaffContext";
import ProductContext from "./context/ProductContext";
import ClientContext from "./context/ClientContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContext>
      <StaffContext>
        <ProductContext>
          <ClientContext>
            <App />
          </ClientContext>
        </ProductContext>
      </StaffContext>
    </AuthContext>
  </BrowserRouter>
);

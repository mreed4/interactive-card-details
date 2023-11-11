import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext.jsx";

import App from "./App.jsx";

import CompletePage from "./CompletePage";
import CardInputPage from "./CardInputPage.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<CardInputPage />} />
            <Route path="complete" element={<CompletePage />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  </React.StrictMode>
);

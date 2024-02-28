import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dialog } from "../Dialog";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dialog" element={<Dialog />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

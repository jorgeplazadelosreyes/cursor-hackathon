import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";
import Tracker from "./pages/Tracker.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-warm">
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

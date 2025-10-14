import React from "react";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Router from "./router/Router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div>
      <Router />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

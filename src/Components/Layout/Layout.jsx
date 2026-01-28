import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
document.documentElement.classList.add("dark");
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

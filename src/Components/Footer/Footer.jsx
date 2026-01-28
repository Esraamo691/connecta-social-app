import React from "react";
import { Card } from "@heroui/react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
export default function Footer() {
  return (
    <>
      <footer className="bg-[#040012] navyt text-gray-200 py-8 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <img
                src={logoImg}
                alt="Kudo Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-semibold">KUDO</span>
          </div>

          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/profile" className="hover:text-white transition">
              Profile
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Sign up
            </Link>
          </nav>

          <div className="text-sm text-gray-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} Kudo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

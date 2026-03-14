import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// New concept: Layout + Outlet
// This file wraps EVERY page with the Navbar automatically
export default function Layout() {
  return (
    <div>
      <Navbar />           {/* Navbar appears on every page */}

      <main>
        <Outlet />         {/* This is where the actual page (Home, Events, etc.) appears */}
      </main>

      {/* Footer will go here later */}
    </div>
  );
}
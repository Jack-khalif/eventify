import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar sits at the very top of the app */}
      <Navbar />
      
      {/* Outlet renders whatever page (Home, Checkout, etc.) the router is on */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/*  <Footer /> here later! */}
    </div>
  );
}
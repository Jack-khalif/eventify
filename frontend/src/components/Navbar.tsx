import { Link } from "react-router-dom";   // ← NEW IMPORT

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#0F172A",
      color: "white",
      padding: "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <h2 style={{ color: "#14B8A6", fontSize: "28px", fontWeight: "bold" }}>
        Eventify
      </h2>

      {/* Menu - now using Link */}
      <div style={{ display: "flex", gap: "32px", fontSize: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/events" style={{ color: "white", textDecoration: "none" }}>
          Events
        </Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          For Hosts
        </Link>
      </div>

      {/* Buttons (still skeleton) */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button style={{ padding: "10px 24px", border: "2px solid white", borderRadius: "9999px", background: "transparent", color: "white" }}>
          Log in
        </button>
        <button style={{ padding: "10px 24px", backgroundColor: "#14B8A6", borderRadius: "9999px", color: "white" }}>
          Sign up free
        </button>
      </div>
    </nav>
  );
}
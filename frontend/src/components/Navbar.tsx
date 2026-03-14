export default function Navbar() {
  return (
    <nav 
      style={{
        backgroundColor: "#0F172A",   // your deep navy
        color: "white",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      {/* Logo */}
      <h2 
        style={{
          color: "#14B8A6",
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "-0.5px"
        }}
      >
        Eventify
      </h2>

      {/* Menu links - perfectly centered */}
      <div style={{ display: "flex", gap: "32px", fontSize: "15px", fontWeight: "500" }}>
        <a href="/" style={{ color: "white", textDecoration: "none" }} className="hover:text-[#14B8A6] transition-colors">
          Home
        </a>
        <a href="/events" style={{ color: "white", textDecoration: "none" }} className="hover:text-[#14B8A6] transition-colors">
          Events
        </a>
        <a href="/dashboard" style={{ color: "white", textDecoration: "none" }} className="hover:text-[#14B8A6] transition-colors">
          For Hosts
        </a>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button 
          style={{
            padding: "10px 24px",
            border: "2px solid rgba(255,255,255,0.7)",
            borderRadius: "9999px",
            background: "transparent",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "white"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          Log in
        </button>

        <button 
          style={{
            padding: "10px 24px",
            backgroundColor: "#14B8A6",
            border: "none",
            borderRadius: "9999px",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0EA78E"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#14B8A6"}
        >
          Sign up free
        </button>
      </div>
    </nav>
  );
}
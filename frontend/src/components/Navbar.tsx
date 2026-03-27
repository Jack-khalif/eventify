import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  // 1. THE LOGIC (You nailed this part!)
  const isAuthenticated = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/auth"); // Kick them back to the login page
  };

  return (
    <header 
      style={{ 
        backgroundColor: "#FFFFFF", 
        borderBottom: "1px solid #E2E8F0",
        position: "sticky", 
        top: 0,
        zIndex: 100, 
        padding: "12px 24px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
        
        {/* 1. BRAND / LOGO AREA */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", cursor: "pointer" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#14B8A6", letterSpacing: "-0.5px" }}>
            Campus<span style={{ color: "#0F172A" }}>Tix</span>
          </span>
        </Link>

        {/* 2. THE SEARCH BAR */}
        <div 
          style={{ 
            flex: 1, 
            maxWidth: "800px", 
            display: "flex", 
            alignItems: "center",
            backgroundColor: "#F8FAFC",
            borderRadius: "50px",
            border: "1px solid #E2E8F0",
            padding: "4px 6px",
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#CBD5E1"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1, padding: "0 12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#94A3B8" style={{ width: "20px", height: "20px", marginRight: "8px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Search tech events, hackathons..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "0.95rem", color: "#0F172A" }} />
          </div>

          <div style={{ width: "1px", height: "24px", backgroundColor: "#CBD5E1", margin: "0 8px" }} />

          <div style={{ display: "flex", alignItems: "center", flex: 0.8, padding: "0 12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#94A3B8" style={{ width: "20px", height: "20px", marginRight: "8px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <input type="text" defaultValue="Nairobi" style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "0.95rem", color: "#0F172A" }} />
          </div>

          <button 
            style={{ backgroundColor: "#14B8A6", border: "none", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background-color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0EA78E"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#14B8A6"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" style={{ width: "18px", height: "18px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

        {/* 3. NAVIGATION LINKS (The Fix is Here!) */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link to="/create-event" style={{ fontSize: "0.95rem", fontWeight: "500", color: "#334155", textDecoration: "none" }}>
            Create Event
          </Link>
          
          {/* Conditional Rendering: Show Profile OR Login Button */}
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0F172A" }}>
                Hi, {username}
              </span>
              <button 
                onClick={handleLogout}
                style={{ padding: "8px 16px", backgroundColor: "#F1F5F9", color: "#475569", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              style={{ padding: "10px 20px", backgroundColor: "#D24000", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "600" }}
            >
              Log In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
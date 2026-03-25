import { Link } from "react-router-dom";   

export default function Navbar() {
  return (
    <header 
      style={{ 
        backgroundColor: "#FFFFFF", 
        borderBottom: "1px solid #E2E8F0",
        position: "sticky", // Keeps it at the top when scrolling
        top: 0,
        zIndex: 100, // Ensures it stays above the Hero and other content
        padding: "12px 24px",
      }}
    >
      <div 
        style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          gap: "24px"
        }}
      >
        
        {/* 1. BRAND / LOGO AREA */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          {/* A simple placeholder logo using our teal color */}
          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#14B8A6", letterSpacing: "-0.5px" }}>
            Campus<span style={{ color: "#0F172A" }}>Tix</span>
          </span>
        </div>

        {/* 2. THE SEARCH BAR (Eventbrite Style) */}
        <div 
          style={{ 
            flex: 1, 
            maxWidth: "800px", 
            display: "flex", 
            alignItems: "center",
            backgroundColor: "#F8FAFC", // Very light gray
            borderRadius: "50px",
            border: "1px solid #E2E8F0",
            padding: "4px 6px",
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#CBD5E1"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
        >
          {/* Search Input */}
          <div style={{ display: "flex", alignItems: "center", flex: 1, padding: "0 12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#94A3B8" style={{ width: "20px", height: "20px", marginRight: "8px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search tech events, hackathons..." 
              style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "0.95rem", color: "#0F172A" }}
            />
          </div>

          {/* Vertical Divider */}
          <div style={{ width: "1px", height: "24px", backgroundColor: "#CBD5E1", margin: "0 8px" }} />

          {/* Location Input */}
          <div style={{ display: "flex", alignItems: "center", flex: 0.8, padding: "0 12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#94A3B8" style={{ width: "20px", height: "20px", marginRight: "8px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <input 
              type="text" 
              defaultValue="Nairobi" 
              style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "0.95rem", color: "#0F172A" }}
            />
          </div>

          {/* Search Button (Circular) */}
          <button 
            style={{ 
              backgroundColor: "#14B8A6", 
              border: "none", 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0EA78E"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#14B8A6"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" style={{ width: "18px", height: "18px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

        {/* 3. NAVIGATION LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#334155", cursor: "pointer" }}>Browse Events</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#334155", cursor: "pointer" }}>Create Event</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#334155", cursor: "pointer" }}>My Tickets</span>
          
          {/* Sign In / Profile Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#64748B" style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
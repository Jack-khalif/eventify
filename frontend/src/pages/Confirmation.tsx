import { useParams, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data again!
  const event = {
    title: "HealthTech & Entrepreneurship Summit 2026",
    date: "Saturday, March 28, 2026 • 9:00 AM EAT",
    location: "Kenyatta University Main Campus",
  };

  // Generate a random mock order number
  const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        
        {/* Success Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", paddingBottom: "24px", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#10B981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>
              Thanks for your order! <span style={{ fontSize: "1.1rem", color: "#64748B", fontWeight: "500" }}>#{orderNumber}</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate("/")}
            style={{ padding: "10px 20px", backgroundColor: "#EFF6FF", color: "#2563EB", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}
          >
            Browse more events
          </button>
        </div>

        {/* Ticket Details */}
        <h2 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
          You're going to
        </h2>
        <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", marginTop: 0, marginBottom: "32px" }}>
          {event.title}
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", fontWeight: "700", color: "#0F172A" }}>TICKET SENT TO</p>
            <p style={{ margin: 0, color: "#475569" }}>beta.tester@campus.edu</p>
          </div>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", fontWeight: "700", color: "#0F172A" }}>DATE</p>
            <p style={{ margin: 0, color: "#475569" }}>{event.date}</p>
          </div>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", fontWeight: "700", color: "#0F172A" }}>LOCATION</p>
            <p style={{ margin: 0, color: "#475569" }}>{event.location}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
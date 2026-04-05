import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  // Fixed the duplicate URL typo in your original image string!
  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80";

  return (
    <section style={{ padding: "0 24px", marginTop: "24px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          minHeight: "450px",
          borderRadius: "40px",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          
          <div>
            <span style={{ backgroundColor: "#FBCFE8", color: "#111827", padding: "4px 12px", fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "3px" }}>
              Eventify
            </span>
          </div>

          <h1 style={{ margin: 0, lineHeight: 1.4, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <span style={{ backgroundColor: "#93C5FD", color: "#111827", padding: "2px 16px", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: "900", textTransform: "uppercase" }}>
              Host events without
            </span>
            <span style={{ backgroundColor: "#93C5FD", color: "#111827", padding: "4px 20px", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: "900", textTransform: "uppercase" }}>
              the empty seats
            </span>
          </h1>

          <p style={{ color: "white", fontSize: "1.1rem", maxWidth: "600px", marginTop: "10px", fontWeight: "500", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            The ticketing platform with guaranteed attendance. 
          </p>

          <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            <button
              onClick={() => navigate('/events')}
              style={{ padding: "14px 32px", backgroundColor: "white", color: "#111827", borderRadius: "50px", border: "none", fontSize: "1rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              Find Events
            </button>
            <button
              onClick={() => navigate('/create')}
              style={{ padding: "14px 32px", backgroundColor: "#14B8A6", color: "white", borderRadius: "50px", border: "none", fontSize: "1rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              Host an Event
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
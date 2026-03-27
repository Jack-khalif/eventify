import { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Grab the data AND the image we passed from Checkout!
  const ticketData = location.state?.ticketData;
  const eventImage = location.state?.eventImage;

  useEffect(() => {
    if (!ticketData) {
      navigate("/");
    }
  }, [ticketData, navigate]);

  // Helper to format the image just like we do on the details page
  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  if (!ticketData) return null;

  return (
    <div style={{ backgroundColor: "#0F172A", minHeight: "100vh", padding: "60px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        
        {/* SUCCESS HEADER */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#10B981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" style={{ width: "40px", height: "40px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "white", margin: "0 0 12px 0" }}>You're going!</h1>
          <p style={{ fontSize: "1.1rem", color: "#94A3B8", margin: 0 }}>
            We've generated {ticketData.quantity} ticket(s) for <strong>{ticketData.event}</strong>.
          </p>
        </div>

        {/* THE TICKETS LOOP */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {ticketData.ticket_ids.map((ticketId: string, index: number) => (
            
            /* 🎟️ THE UPGRADED TICKET CARD */
            <div key={ticketId} style={{ display: "flex", backgroundColor: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}>
              
              {/* 🚀 NEW: THE EVENT POSTER BANNER (Left Side) */}
              <div style={{ 
                width: "180px", 
                backgroundImage: `url(${getImageUrl(eventImage)})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center",
                borderRight: "1px solid #E2E8F0"
              }} />

              {/* MAIN TICKET BODY (Middle) */}
              <div style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <span style={{ backgroundColor: "#F1F5F9", color: "#475569", padding: "6px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                      General Admission
                    </span>
                    <span style={{ color: "#94A3B8", fontWeight: "600", fontSize: "0.9rem" }}>
                      Ticket {index + 1} of {ticketData.quantity}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0", lineHeight: 1.2 }}>
                    {ticketData.event}
                  </h2>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0", fontWeight: "600" }}>Ticket ID</p>
                  <p style={{ fontSize: "1.25rem", color: "#0F172A", margin: 0, fontWeight: "700", fontFamily: "monospace" }}>{ticketId}</p>
                </div>
              </div>

              {/* PERFORATION LINE (The dashed cut-out effect) */}
              <div style={{ width: "2px", borderLeft: "3px dashed #CBD5E1", position: "relative" }}>
                <div style={{ position: "absolute", top: "-15px", left: "-14px", width: "30px", height: "30px", backgroundColor: "#0F172A", borderRadius: "50%" }}></div>
                <div style={{ position: "absolute", bottom: "-15px", left: "-14px", width: "30px", height: "30px", backgroundColor: "#0F172A", borderRadius: "50%" }}></div>
              </div>

              {/* TICKET STUB / QR CODE (Right Side) */}
              <div style={{ width: "200px", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F8FAFC" }}>
                <div style={{ padding: "12px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <QRCode value={ticketId} size={110} level="H" />
                </div>
                <p style={{ marginTop: "16px", fontSize: "0.8rem", color: "#64748B", textAlign: "center", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Scan at door
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* BACK TO HOME ACTION */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link to="/" style={{ color: "#14B8A6", textDecoration: "none", fontSize: "1.1rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "8px", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(20, 184, 166, 0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
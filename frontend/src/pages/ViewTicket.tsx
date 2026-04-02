import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

interface TicketDetails {
  ticket_id: string;
  event_title: string;
  event_date: string;
  buyer_name: string;
  is_scanned: boolean;
}

export default function ViewTicket() {
  const { id } = useParams(); // This is the ticket_id from the URL
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/tickets/ticket/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Ticket not found or invalid link.");
        return res.json();
      })
      .then((data) => setTicket(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div style={{ textAlign: "center", padding: "60px", color: "red" }}>{error}</div>;
  if (!ticket) return <Loader />;

  return (
    <div style={{ backgroundColor: "#0F172A", minHeight: "100vh", padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "sans-serif" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "white", fontSize: "2rem", margin: "0 0 8px 0" }}>Your Digital Ticket</h1>
        <p style={{ color: "#94A3B8", margin: 0 }}>Have this QR code ready at the door.</p>
      </div>

      {/* The Perforated Ticket UI */}
      <div style={{ display: "flex", backgroundColor: "white", borderRadius: "16px", overflow: "hidden", maxWidth: "700px", width: "100%", position: "relative" }}>
        
        {/* Left Side: Event Details */}
        <div style={{ flex: "2", padding: "40px", borderRight: "2px dashed #CBD5E1", position: "relative" }}>
          {/* Top and Bottom semi-circles to create the perforated look */}
          <div style={{ position: "absolute", top: "-15px", right: "-15px", width: "30px", height: "30px", backgroundColor: "#0F172A", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", bottom: "-15px", right: "-15px", width: "30px", height: "30px", backgroundColor: "#0F172A", borderRadius: "50%" }}></div>
          
          <span style={{ backgroundColor: "#F1F5F9", color: "#475569", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "1px" }}>GENERAL ADMISSION</span>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", marginTop: "16px", marginBottom: "8px" }}>{ticket.event_title}</h2>
          <p style={{ color: "#64748B", fontSize: "1rem", marginBottom: "32px", fontWeight: "500" }}>{ticket.event_date}</p>
          
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#64748B", textTransform: "uppercase", fontWeight: "700" }}>Ticket Holder</p>
            <p style={{ margin: "0 0 16px 0", fontSize: "1.1rem", fontWeight: "600", color: "#0F172A" }}>{ticket.buyer_name}</p>
            
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#64748B", textTransform: "uppercase", fontWeight: "700" }}>Ticket ID</p>
            <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800", color: "#0F172A", fontFamily: "monospace" }}>{ticket.ticket_id}</p>
          </div>
        </div>

        {/* Right Side: The QR Code */}
        <div style={{ flex: "1", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F8FAFC" }}>
          {ticket.is_scanned ? (
             <div style={{ color: "#DC2626", fontWeight: "800", fontSize: "1.5rem", border: "4px solid #DC2626", padding: "10px", transform: "rotate(-15deg)" }}>SCANNED</div>
          ) : (
            <>
              {/* Fake QR Code using an API for now - replace with your react-qr-code if you have one! */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticket_id}`} alt="QR Code" style={{ width: "150px", height: "150px", marginBottom: "16px", borderRadius: "8px" }} />
              <p style={{ margin: 0, color: "#64748B", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase" }}>Scan at Door</p>
            </>
          )}
        </div>
      </div>

      <Link to="/" style={{ marginTop: "40px", color: "#38BDF8", textDecoration: "none", fontWeight: "600" }}>← Back to Home</Link>
    </div>
  );
}
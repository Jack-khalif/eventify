import { useParams,Link } from "react-router-dom";
import { events } from "../data/events";

export default function Confirmation() {
  const { id } = useParams();
  const event = events.find(e => e.id === id);

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ color: "#14B8A6", fontSize: "36px" }}>🎟️ Ticket Purchased!</h1>
      
      {event && (
        <div style={{ marginTop: "40px" }}>
          <h2>{event.title}</h2>
          <p>{event.date} • {event.location}</p>
          
          <div style={{
            margin: "40px auto",
            padding: "30px",
            border: "2px dashed #14B8A6",
            borderRadius: "16px",
            maxWidth: "400px"
          }}>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Your digital ticket is ready
            </p>
            <p style={{ fontWeight: "bold" }}>Ticket ID: TICK-{Date.now().toString().slice(-6)}</p>
            {/* QR code placeholder */}
            <div style={{
              width: "180px",
              height: "180px",
              background: "#eee",
              margin: "20px auto",
              borderRadius: "8px"
            }}>
              QR CODE HERE
            </div>
          </div>
        </div>
      )}

      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "30px",
          background: "#0F172A",
          color: "white",
          padding: "14px 32px",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
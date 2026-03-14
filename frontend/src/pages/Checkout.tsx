import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";

export default function Checkout() {
  const { id } = useParams();                     // get event id from URL
  
  // For skeleton we just find the event by id (dummy data)
  const event = events.find(e => e.id === id);

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        Checkout
      </h1>

      {/* Event summary */}
      {event && (
        <div style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "30px"
        }}>
          <h2>{event.title}</h2>
          <p style={{ opacity: 0.7 }}>{event.date} • {event.location}</p>
          <p style={{ color: "#14B8A6", fontWeight: "bold", marginTop: "10px" }}>
            From {event.price}
          </p>
        </div>
      )}

      {/* Ticket quantity selector (skeleton) */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
          How many tickets?
        </label>
        <select style={{ padding: "12px", width: "200px", borderRadius: "8px" }}>
          <option>1 ticket</option>
          <option>2 tickets</option>
          <option>3 tickets</option>
        </select>
      </div>

      {/* Order summary */}
      <div style={{
        background: "#f8f9fa",
        padding: "24px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginBottom: "15px" }}>Order Summary</h3>
        <p>Tickets × 1 = {event?.price}</p>
        <p style={{ fontWeight: "bold", marginTop: "20px" }}>
          Total: {event?.price}
        </p>
      </div>

      {/* Continue button - goes to confirmation */}
      <Link
        to={`/confirmation/${id}`}
        style={{
          display: "block",
          background: "#14B8A6",
          color: "white",
          padding: "16px",
          textAlign: "center",
          borderRadius: "8px",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        Proceed to Payment
      </Link>
    </div>
  );
}
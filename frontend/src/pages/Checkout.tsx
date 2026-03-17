import { useParams, useSearchParams, Link } from "react-router-dom";
import { events } from "../data/events";

export default function Checkout() {
  const { id } = useParams();
  const [searchParams] = useSearchParams(); // ← NEW: reads ?tier=...&qty=...

  const event = events.find((e) => e.id === id);

  // Read selected tier & quantity from URL
  const selectedTier = searchParams.get("tier") || "Professional"; // fallback
  const qtyFromUrl = Number(searchParams.get("qty")) || 1;

  // Fake prices per tier (later this can come from real data / API)
  const tierPrices: Record<string, number> = {
    Professional: 1500,
    "Young Professional": 1000,
    Student: 600,
  };

  const pricePerTicket = tierPrices[selectedTier] || 1500;
  const subtotal = pricePerTicket * qtyFromUrl;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>Checkout</h1>

      {/* Event summary */}
      {event && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "30px",
          }}
        >
          <h2>{event.title}</h2>
          <p style={{ opacity: 0.7 }}>
            {event.date} • {event.location}
          </p>
          <p style={{ color: "#14B8A6", fontWeight: "bold", marginTop: "10px" }}>
            Selected: <strong>{selectedTier}</strong>
          </p>
        </div>
      )}

      {/* Ticket quantity — now editable */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
          Quantity
        </label>
        <select
          value={qtyFromUrl}
          onChange={(e) => {
            // Update URL when user changes quantity
            const newQty = e.target.value;
            const newParams = new URLSearchParams(searchParams);
            newParams.set("qty", newQty);
            window.history.replaceState(null, "", `?${newParams.toString()}`);
          }}
          style={{ padding: "12px", width: "200px", borderRadius: "8px" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} ticket{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Order summary — now dynamic */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Order Summary</h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <span>
            {selectedTier} × {qtyFromUrl}
          </span>
          <span>KSh {pricePerTicket.toLocaleString()}</span>
        </div>
        <hr style={{ margin: "16px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total</span>
          <span style={{ color: "#14B8A6" }}>KSh {subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Proceed button */}
      <Link
        to={`/confirmation/${id}?tier=${encodeURIComponent(selectedTier)}&qty=${qtyFromUrl}`}
        style={{
          display: "block",
          background: "#14B8A6",
          color: "white",
          padding: "16px",
          textAlign: "center",
          borderRadius: "8px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Proceed to Payment
      </Link>
    </div>
  );
}
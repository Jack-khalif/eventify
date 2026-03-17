import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import TicketTierSelector from "../components/TicketTierSelector";

export default function EventDetails() {
  const { id } = useParams();

  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const ticketTiers = [
    { name: "Professional", price: "KSh 1,500", available: 42 },
    { name: "Young Professional", price: "KSh 1,000", available: 18 },
    { name: "Student", price: "KSh 600", available: 8 },
  ];

  // Build checkout URL with selected values
  const checkoutUrl = selectedTier
    ? `/checkout/${id}?tier=${encodeURIComponent(selectedTier)}&qty=${quantity}`
    : `/checkout/${id}`;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>Event: {id}</h1>

      {/* banner image ... keep as is */}

      <p style={{ marginBottom: "32px", lineHeight: "1.6" }}>
        {/* description ... keep as is */}
      </p>

      <TicketTierSelector
        tiers={ticketTiers}
        onSelectionChange={(tier, qty) => {
          setSelectedTier(tier);
          setQuantity(qty);
        }}
      />

      <div style={{ marginTop: "40px" }}>
        <Link
          to={checkoutUrl}
          style={{
            display: "inline-block",
            background: selectedTier ? "#14B8A6" : "#ccc",
            color: "white",
            padding: "14px 32px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            pointerEvents: selectedTier ? "auto" : "none", // disable if no tier selected
            opacity: selectedTier ? 1 : 0.6,
          }}
        >
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
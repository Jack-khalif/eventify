import { useState } from "react";
import { useEffect } from "react";

type TicketTier = {
  name: string;
  price: string;
  available: number;
};

type TicketTierSelectorProps = {
  tiers: TicketTier[];
  onSelectionChange?: (tierName: string | null, quantity: number) => void;
};

export default function TicketTierSelector({ tiers, onSelectionChange }: TicketTierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // NEW: notify parent whenever selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedTier, quantity);
    }
  }, [selectedTier, quantity, onSelectionChange]);
  return (
    <div style={{ margin: "32px 0" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>Choose your ticket</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            onClick={() => setSelectedTier(tier.name)}
            style={{
              padding: "16px",
              border: selectedTier === tier.name ? "2px solid #14B8A6" : "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              background: selectedTier === tier.name ? "#f0fdfa" : "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{tier.name}</strong>
                <div style={{ color: "#14B8A6", fontWeight: "bold", marginTop: "4px" }}>
                  {tier.price}
                </div>
              </div>
              <div style={{ color: tier.available > 0 ? "#666" : "#e74c3c" }}>
                {tier.available > 0 ? `${tier.available} left` : "Sold out"}
              </div>
            </div>

            {selectedTier === tier.name && (
              <div style={{ marginTop: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ padding: "8px", width: "120px", borderRadius: "6px" }}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
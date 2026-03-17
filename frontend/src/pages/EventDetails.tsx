import { useParams, Link } from "react-router-dom";
import TicketTierSelector from "../components/TicketTierSelector";

export default function EventDetails() {
  const { id } = useParams();

  // Fake ticket tiers — later this will come from props / API
  const ticketTiers = [
    { name: "Professional", price: "KSh 1,500", available: 42 },
    { name: "Young Professional", price: "KSh 1,000", available: 18 },
    { name: "Student", price: "KSh 600", available: 8 },
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>Event: {id}</h1>

      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        alt="Event banner"
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "32px",
        }}
      />

      <p style={{ marginBottom: "32px", lineHeight: "1.6" }}>
        This is a placeholder description. In a real version this would contain all the important
        information about the event: what to expect, who it's for, schedule, speakers etc.
      </p>

      <TicketTierSelector tiers={ticketTiers} />

      <div style={{ marginTop: "40px" }}>
        <Link
          to={`/checkout/${id}`}
          style={{
            display: "inline-block",
            background: "#14B8A6",
            color: "white",
            padding: "14px 32px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
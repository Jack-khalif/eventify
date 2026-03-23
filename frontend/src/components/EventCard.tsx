import { Link } from "react-router-dom";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
};

export default function EventCard({ id, title, date, location, price, image }: EventCardProps) {
  // Fake badge for realism (you can make this dynamic later)
  const badge = price === "Free" ? "Free" : Math.random() > 0.7 ? "Going fast" : null;

  return (
    <Link
      to={`/event/${id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div style={{
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
      }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />

          {/* Badge overlay */}
          {badge && (
            <div style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: badge === "Free" ? "#22c55e" : "#ef4444",
              color: "white",
              padding: "6px 12px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
            }}>
              {badge}
            </div>
          )}

          {/* Price tag */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
          }}>
            {price}
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: "0 0 8px 0",
            lineHeight: "1.3",
          }}>
            {title}
          </h3>

          <div style={{ fontSize: "14px", color: "#4b5563" }}>
            <div>{date}</div>
            <div>{location}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
import { Link } from "react-router-dom";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
};

export default function EventCard(props: EventCardProps) {
  return (
    <Link
      to={`/event/${props.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.15s ease",
        }}
        // visual feedback when hovering the card
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={props.image}
          alt={props.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />

        <div style={{ padding: "16px" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>{props.title}</h3>

          <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.5" }}>
            <div>{props.date}</div>
            <div>{props.location}</div>
          </div>

          <div
            style={{
              marginTop: "12px",
              color: "#14B8A6",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            From {props.price}
          </div>
        </div>
      </div>
    </Link>
  );
}
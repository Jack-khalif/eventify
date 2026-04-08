import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import Loader from "./Loader";

interface Event {
  id: string | number;
  title: string;
  date: string;
  location: string;
  ticket_price: string | number;
  image: string;
  is_past: boolean;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventify-api-zm3d.onrender.com/api/events/")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        // Show only the 4 most recent upcoming events on homepage
        const upcoming = data.filter((e: Event) => !e.is_past).slice(0, 4);
        setEvents(upcoming);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0F172A", margin: 0 }}>
          Upcoming Events
        </h2>
        <button
          onClick={() => navigate("/events")}
          style={{
            background: "none", border: "1.5px solid #E2E8F0",
            borderRadius: "8px", padding: "8px 16px",
            color: "#475569", fontWeight: "600", cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          View all →
        </button>
      </div>

      {events.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 40px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <p style={{ fontSize: "2.5rem", margin: "0 0 12px 0" }}></p>
          <h3 style={{ color: "#0F172A", margin: "0 0 8px 0" }}>No upcoming events</h3>
          <p style={{ color: "#64748B", margin: "0 0 20px 0" }}>Be the first to host one!</p>
          <button
            onClick={() => navigate("/create-event")}
            style={{
              padding: "12px 24px", backgroundColor: "#14B8A6",
              color: "white", border: "none", borderRadius: "8px",
              fontWeight: "600", cursor: "pointer"
            }}
          >
            Create Event
          </button>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px"
        }}>
          {events.map(event => (
            <EventCard
              key={event.id}
              id={event.id.toString()}
              title={event.title}
              date={event.date}
              location={event.location}
              price={event.ticket_price?.toString() || "Free"}
              image={event.image}
              isPast={event.is_past}
            />
          ))}
        </div>
      )}
    </section>
  );
}
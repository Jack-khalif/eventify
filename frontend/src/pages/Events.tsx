import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

interface Event {
  id: string | number;
  title: string;
  date: string;
  location: string;
  ticket_price: string | number;
  image: string;
  is_past: boolean;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const categoryLabels: Record<string, string> = {
    'hackathon': 'Hackathons',
    'tech-summit': 'Tech Summits',
    'workshop': 'Workshops',
    'networking': 'Networking',
    'campus': 'Campus Life',
    'club': 'Clubs',
  };

  useEffect(() => {
    setIsLoading(true);
    const url = category
      ? `https://eventify-api-zm3d.onrender.com/api/events/?category=${category}`
      : `https://eventify-api-zm3d.onrender.com/api/events/`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(data => { setEvents(data); setIsLoading(false); })
      .catch(err => { setError(err.message); setIsLoading(false); });
  }, [category]);

  if (isLoading) return <Loader />;
  if (error) return <p style={{ color: "red", padding: "40px" }}>{error}</p>;

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>
            {category ? categoryLabels[category] || "Events" : "All Events"}
          </h1>
          <p style={{ color: "#64748B", margin: 0 }}>
            {events.length} event{events.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {events.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: "white", borderRadius: "16px" }}>
            <p style={{ fontSize: "3rem", margin: "0 0 16px 0" }}></p>
            <h3 style={{ color: "#0F172A", margin: "0 0 8px 0" }}>No events yet</h3>
            <p style={{ color: "#64748B" }}>Check back soon — events will be posted here.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {events.map(event => (
              <EventCard
                key={event.slug}
                id={event.slug.toString()}
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
      </div>
    </div>
  );
}
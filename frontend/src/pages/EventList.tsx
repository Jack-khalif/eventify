import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.tsx";
import Loader from "../components/Loader.tsx";

interface Event {
  id: string | number;
  title: string;
  date: string;
  location: string;
  price: string | number;
  image: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://eventify-api-zm3d.onrender.com/api/events/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader />;

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "40px"
    }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id.toString()}
          title={event.title}
          date={event.date}
          location={event.location}
          price={event.price?.toString() || "Free"}
          image={event.image}
        />
      ))}
    </div>
  );
}
import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function Events() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        All Events
      </h1>

      {/* Simple grid - same as FeaturedEvents but full page */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px"
      }}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );
}
import { events } from "../data/events";
import EventCard from "./EventCard";

export default function FeaturedEvents() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",  // responsive, 3–4 cols on desktop
      gap: "24px",
      paddingBottom: "60px",
    }}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
import Hero from "../components/Hero";
//import FeaturedEvents from "../components/FeaturedEvents";
import CategoryIcons from "../components/CategoryIcons";
//import EventCards from "../components/EventCard";
import EventList from "./EventList";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>  {/* white body like Eventbrite */}
      <Hero />

      <CategoryIcons />

       <EventList/>
      {/* You can add more sections later: categories, popular cities, etc. */}
    </div>
  );
}
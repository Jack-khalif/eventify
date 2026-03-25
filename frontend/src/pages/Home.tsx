import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import CategoryIcons from "../components/CategoryIcons";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>  {/* white body like Eventbrite */}
      <Hero />

      {/* Spacer / subtle separation */}
      <div style={{ height: "40px" }} />
      <CategoryIcons />

      {/* Recommended events section - right below hero */}
      <section style={{
        padding: "0 20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#0F172A",  // navy for heading
        }}>
          Recommended Events in Nairobi
        </h2>

        <FeaturedEvents />  {/* your existing grid component */}
      </section>

      {/* You can add more sections later: categories, popular cities, etc. */}
    </div>
  );
}
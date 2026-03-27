import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

// 1. THE BLUEPRINT: Tells TypeScript exactly what data to expect from Django
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  badge?: string | null;
  badgeColor?: string;
  badgeTextColor?: string;
}

export default function EventCards() {
  const navigate = useNavigate();
  
  // 2. We tell useState to expect an array of 'Event' objects
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/') 
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch events from Django');
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader />;
  
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#991B1B", backgroundColor: "#FEE2E2", borderRadius: "8px", margin: "24px" }}>
        <h3>Backend Connection Error</h3>
        <p>{error}</p>
        <p style={{ fontSize: "0.9rem" }}>Make sure your Django server is running and CORS is configured!</p>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          Trending events in <span style={{ color: "#14B8A6", cursor: "pointer" }}>Nairobi 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px", display: "inline", marginLeft: "4px", verticalAlign: "middle" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </h2>
        
        <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#14B8A6", borderBottom: "2px solid #14B8A6", paddingBottom: "8px", cursor: "pointer" }}>All</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>For you</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>Today</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>This weekend</span>
        </div>
      </div>

      {/* 3. EMPTY STATE FALLBACK: What to show if Django returns [] */}
      {events.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748B" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "48px", height: "48px", margin: "0 auto 16px", opacity: 0.5 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <h3 style={{ fontSize: "1.2rem", color: "#0F172A" }}>No events found</h3>
          <p>Create an event in your Django Admin panel to see it here!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px 20px" }}>
          {events.map((event) => (
            <div 
              key={event.id} 
              onClick={() => navigate(`/event/${event.id}`)}
              style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
            >
              <div style={{ width: "100%", aspectRatio: "3/2", borderRadius: "12px", overflow: "hidden", marginBottom: "12px", position: "relative" }}>
                <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {event.badge && (
                  <span style={{ alignSelf: "flex-start", backgroundColor: event.badgeColor || "#E2E8F0", color: event.badgeTextColor || "#1E293B", fontSize: "0.75rem", fontWeight: "700", padding: "2px 8px", borderRadius: "4px", marginBottom: "8px", textTransform: "capitalize" }}>
                    {event.badge}
                  </span>
                )}
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 4px 0", lineHeight: 1.3 }}>{event.title}</h3>
                <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#D97706", margin: "0 0 2px 0" }}>{event.date}</p>
                <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 8px 0" }}>{event.location}</p>
                <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155", marginTop: "auto" }}>{event.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
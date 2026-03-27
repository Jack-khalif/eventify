import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; // 

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Set loading to TRUE by default
  const [isLoading, setIsLoading] = useState(true);

  // 2. Simulate a backend network request taking 800 milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Turn off the loader after 0.8 seconds
    }, 800);
    
    return () => clearTimeout(timer); // Cleanup function
  }, [id]);

  // 3. If it's loading, ONLY return the Loader component
  if (isLoading) {
    return <Loader />;
  }

  // In a real app, we would fetch data from your backend using this ID. 
  // For the beta frontend, we will use a high-quality mock event.
  const event = {
    title: "HealthTech & Entrepreneurship Summit 2026",
    date: "Saturday, March 28, 2026",
    time: "9:00 AM - 4:00 PM EAT",
    location: "Kenyatta University Main Campus, Amphitheatre",
    price: "Free",
    organizer: "CampusTix Startups",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    description: `Join us for the premier intersection of healthcare innovation and student entrepreneurship. 
    
    Whether you are building the next big app for reading accessibility, designing medical hardware, or just want to network with fellow builders, this summit is for you.
    
    What to expect:
    • Keynote speakers from leading MedTech startups.
    • Networking sessions with investors and peers.
    • Live pitch deck tear-downs.`,
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* 1. Event Hero Image */}
      {/* 1. Event Hero Image (Upgraded for Posters/Flyers) */}
      <div 
        style={{ 
          width: "100%", 
          height: "45vh", 
          minHeight: "350px", 
          position: "relative",
          backgroundColor: "#0F172A", // Dark fallback
          display: "flex",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {/* The blurred background layer */}
        <div 
          style={{ 
            position: "absolute", 
            inset: "-20px", // Pulls it past the edges to hide hard blur lines
            backgroundImage: `url(${event.image})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            filter: "blur(20px)", 
            opacity: 0.5 
          }} 
        />
        
        {/* The actual uncropped poster */}
        <img 
          src={event.image} 
          alt="Event Poster" 
          style={{ 
            position: "relative", 
            zIndex: 1, 
            height: "100%", 
            maxWidth: "100%", 
            objectFit: "contain", // 👈 This ensures the whole poster is always visible!
            padding: "24px" // Gives it some breathing room
          }} 
        />
      </div>

      {/* 2. Main Content Container */}
      <div style={{ maxWidth: "1200px", margin: "-60px auto 0", padding: "0 24px", display: "flex", gap: "32px", position: "relative", zIndex: 10, flexWrap: "wrap" }}>
        
        {/* LEFT COLUMN: Details */}
        <div style={{ flex: "1 1 600px", backgroundColor: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <span style={{ backgroundColor: "#E0F2FE", color: "#0369A1", padding: "4px 12px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase" }}>
            Health & Tech
          </span>
          
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginTop: "16px", marginBottom: "24px", lineHeight: 1.2 }}>
            {event.title}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {/* Date/Time Row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>📅</div>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{event.date}</p>
                <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem" }}>{event.time}</p>
              </div>
            </div>
            
            {/* Location Row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{event.location}</p>
                <p style={{ margin: 0, color: "#14B8A6", fontSize: "0.9rem", cursor: "pointer", fontWeight: "500" }}>View on Map</p>
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "32px 0" }} />

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "16px" }}>About this event</h2>
          <p style={{ color: "#475569", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {event.description}
          </p>
        </div>

        {/* RIGHT COLUMN: Sticky Checkout Card */}
        <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>Get Tickets</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "1.1rem", color: "#475569" }}>General Admission</span>
              <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0F172A" }}>{event.price}</span>
            </div>

            <button 
              onClick={() => navigate(`/checkout/${id}`)} // Routes to our next step!
              style={{ width: "100%", padding: "16px", backgroundColor: "#14B8A6", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer", transition: "background-color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0EA78E"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#14B8A6"}
            >
              Reserve a spot
            </button>
            
            <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.85rem", marginTop: "16px", marginBottom: 0 }}>
              No refunds. Secure checkout.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
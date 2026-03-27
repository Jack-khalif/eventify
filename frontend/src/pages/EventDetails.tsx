import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

// Blueprint for TypeScript
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  ticket_price: string;
  description: string;
  image: string | null;
}

export default function EventDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper Functions
  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  const formatEventDate = (isoString: string) => {
    if (!isoString) return "Date TBA";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Event link copied! Ready to paste into WhatsApp.");
  };

  useEffect(() => {
    // Fetch the single event from Django using the ID from the URL
    fetch(`http://127.0.0.1:8000/api/events/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error("Event not found");
        return response.json();
      })
      .then(data => {
        setEvent(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <Loader />;
  if (error || !event) return <div style={{ textAlign: "center", padding: "60px", fontSize: "1.2rem" }}>Event not found.</div>;

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", paddingBottom: "60px" }}>
      
      {/* 1. Event Hero Image */}
      <div style={{ width: "100%", height: "45vh", minHeight: "350px", position: "relative", backgroundColor: "#0F172A", display: "flex", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "-20px", backgroundImage: `url(${getImageUrl(event.image)})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px)", opacity: 0.5 }} />
        <img src={getImageUrl(event.image)} alt="Event Poster" style={{ position: "relative", zIndex: 1, height: "100%", maxWidth: "100%", objectFit: "contain", padding: "24px" }} />
      </div>

      {/* 2. Main Content Container */}
      <div style={{ maxWidth: "1200px", margin: "-60px auto 0", padding: "0 24px", display: "flex", gap: "32px", position: "relative", zIndex: 10, flexWrap: "wrap" }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: "1 1 600px", backgroundColor: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginTop: "16px", marginBottom: "24px", lineHeight: 1.2 }}>
            {event.title}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>📅</div>
              <div><p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{formatEventDate(event.date)}</p></div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
              <div><p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{event.location}</p></div>
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
              <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0F172A" }}>{event.ticket_price === "0.00" ? "Free" : `KES ${event.ticket_price}`}</span>
            </div>

            {/* THE ORIGINAL RESERVE BUTTON */}
            <button 
              onClick={() => navigate(`/checkout/${id}`)}
              style={{ width: "100%", padding: "16px", backgroundColor: "#14B8A6", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer", transition: "background-color 0.2s", marginBottom: "12px" }}
            >
              Reserve a spot
            </button>
            
            {/*  THE NEW SHARE BUTTON GOES RIGHT HERE */}
            <button 
              onClick={handleShare}
              style={{ width: "100%", padding: "12px", backgroundColor: "white", color: "#475569", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              Share Event
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
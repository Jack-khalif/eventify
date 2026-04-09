import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

interface Event {
  id: string;        // UUID now
  slug: string;      // ← added
  title: string;
  date: string;
  location: string;
  ticket_price: string;
  description: string;
  image: string | null;
  is_past: boolean;  // ← added
}

export default function EventDetails() {
  const { id } = useParams(); // this is now the slug e.g. "campus-hackathon-2026"
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80";
    if (imagePath.startsWith('http')) return imagePath;
    return `https://eventify-api-zm3d.onrender.com${imagePath}`;
  };

  const formatEventDate = (isoString: string) => {
    if (!isoString) return "Date TBA";
    return new Date(isoString).toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // id here is the slug — backend lookup_field = 'slug' handles this
    fetch(`https://eventify-api-zm3d.onrender.com/api/events/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error("Event not found");
        return response.json();
      })
      .then(data => { setEvent(data); setIsLoading(false); })
      .catch(err => { setError(err.message); setIsLoading(false); });
  }, [id]);

  if (isLoading) return <Loader />;
  if (error || !event) return (
    <div style={{ textAlign: "center", padding: "60px", fontSize: "1.2rem", color: "#64748B" }}>
      Event not found.
    </div>
  );

  const isFree = event.ticket_price === "0.00" || event.ticket_price === "0";

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", paddingBottom: "60px" }}>

      {/* Hero Image */}
      <div style={{
        width: "100%", height: "45vh", minHeight: "350px",
        position: "relative", backgroundColor: "#0F172A",
        display: "flex", justifyContent: "center", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: "-20px",
          backgroundImage: `url(${getImageUrl(event.image)})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "blur(20px)", opacity: 0.5
        }} />
        <img
          src={getImageUrl(event.image)} alt="Event Poster"
          style={{ position: "relative", zIndex: 1, height: "100%", maxWidth: "100%", objectFit: "contain", padding: "24px" }}
        />
        {/* Past event banner */}
        {event.is_past && (
          <div style={{
            position: "absolute", top: "20px", left: "20px", zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.7)", color: "white",
            padding: "6px 16px", borderRadius: "20px",
            fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.05em"
          }}>
            PAST EVENT
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px", margin: "-60px auto 0", padding: "0 24px",
        display: "flex", gap: "32px", position: "relative", zIndex: 10, flexWrap: "wrap"
      }}>

        {/* LEFT COLUMN */}
        <div style={{
          flex: "1 1 600px", backgroundColor: "white",
          borderRadius: "16px", padding: "32px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
        }}>
          <h1 style={{
            fontSize: "2.5rem", fontWeight: "800", color: "#0F172A",
            marginTop: "16px", marginBottom: "24px", lineHeight: 1.2
          }}>
            {event.title}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📅</div>
              <div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", fontWeight: "600", marginBottom: "2px" }}>DATE & TIME</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{formatEventDate(event.date)}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📍</div>
              <div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", fontWeight: "600", marginBottom: "2px" }}>LOCATION</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#0F172A" }}>{event.location}</p>
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "32px 0" }} />

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "16px" }}>
            About this event
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {event.description}
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <div style={{
            backgroundColor: "white", borderRadius: "16px", padding: "24px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            position: "sticky", top: "100px"
          }}>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
              Get Tickets
            </h3>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px", backgroundColor: "#F8FAFC", borderRadius: "10px",
              marginBottom: "20px", border: "1px solid #E2E8F0"
            }}>
              <span style={{ color: "#475569", fontWeight: "500" }}>General Admission</span>
              <span style={{ fontSize: "1.3rem", fontWeight: "800", color: isFree ? "#14B8A6" : "#0F172A" }}>
                {isFree ? "Free" : `KES ${event.ticket_price}`}
              </span>
            </div>

            {event.is_past ? (
              <div style={{
                width: "100%", padding: "16px", backgroundColor: "#F1F5F9",
                color: "#94A3B8", border: "none", borderRadius: "8px",
                fontSize: "1rem", fontWeight: "700", textAlign: "center",
                marginBottom: "12px"
              }}>
                This event has ended
              </div>
            ) : (
              <button
                onClick={() => navigate(`/checkout/${event.id}`)} // ← UUID, not slug
                style={{
                  width: "100%", padding: "16px", backgroundColor: "#14B8A6",
                  color: "white", border: "none", borderRadius: "8px",
                  fontSize: "1.1rem", fontWeight: "700", cursor: "pointer",
                  marginBottom: "12px", transition: "background 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0F9A8A")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#14B8A6")}
              >
                {isFree ? "Register — it's free" : "Reserve a spot"}
              </button>
            )}

            {/* Share UI */}
            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #E2E8F0" }}>
              <p style={{
                fontSize: "0.8rem", fontWeight: "700", color: "#94A3B8",
                marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.8px"
              }}>
                Share this event
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text" readOnly value={window.location.href}
                  style={{
                    flex: 1, padding: "10px 12px", borderRadius: "8px",
                    border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC",
                    color: "#64748B", fontSize: "0.82rem", outline: "none",
                    textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"
                  }}
                />
                <button
                  onClick={handleShare}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: copied ? "#ECFDF5" : "#F1F5F9",
                    color: copied ? "#059669" : "#475569",
                    border: `1px solid ${copied ? "#A7F3D0" : "#E2E8F0"}`,
                    borderRadius: "8px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "6px",
                    fontSize: "0.82rem", fontWeight: "700",
                    transition: "all 0.2s ease", whiteSpace: "nowrap"
                  }}
                >
                  {copied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp share bonus */}
              <a
              
                href={`https://wa.me/?text=Check out this event: ${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", marginTop: "10px", padding: "10px",
                  backgroundColor: "#ECFDF5", color: "#059669",
                  border: "1px solid #A7F3D0", borderRadius: "8px",
                  textDecoration: "none", fontSize: "0.85rem", fontWeight: "600"
                }}
              >
                <span>📲</span> Share on WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
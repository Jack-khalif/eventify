import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

interface Event {
  id: number;
  title: string;
  date: string;
  ticket_price: string;
  image: string | null;
}

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // GUEST STATE: We need these if the user isn't logged in
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  // Check auth status quietly
  const isAuthenticated = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
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
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    
    // The exact payload Django is expecting
    const orderPayload = {
      event_id: id,
      quantity: quantity,
      is_guest: !isAuthenticated,
      guest_name: isAuthenticated ? null : guestName,
      guest_email: isAuthenticated ? null : guestEmail,
    };

    try {
      // 1. Setup headers. If they are logged in, flash the VIP Token!
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      // 2. Send the order to the Django Factory
      const response = await fetch("http://127.0.0.1:8000/api/tickets/purchase/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ FIXED: The Magic Question Mark (Optional Chaining)
        // This safely grabs event.image even if event is null/undefined
        navigate(`/confirmation/${id}`, { 
          state: { 
            ticketData: data,
            eventImage: event?.image 
          } 
        });
      } else {
        alert(`Checkout failed: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Is Django running?");
    }
  };

  if (isLoading) return <Loader />;
  if (!event) return <div style={{ textAlign: "center", padding: "60px" }}>Event not found.</div>;

  const priceNum = parseFloat(event.ticket_price);
  const isFree = priceNum === 0;
  const total = (priceNum * quantity).toFixed(2);

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "32px", flexWrap: "wrap" }}>
        
        {/* LEFT COLUMN: The Interactive Form */}
        <div style={{ flex: "1 1 500px", backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          
          {step === 1 ? (
            /* --- STEP 1: SELECT TICKETS --- */
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "24px" }}>Select Tickets</h2>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "24px", borderBottom: "1px solid #E2E8F0" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#0F172A", margin: "0 0 4px 0" }}>General Admission</h3>
                  <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem" }}>
                    {isFree ? "Free" : `KES ${event.ticket_price}`}
                  </p>
                </div>
                
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem", outline: "none", cursor: "pointer" }}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  onClick={() => setStep(2)}
                  style={{ padding: "14px 32px", backgroundColor: "#D24000", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" }}
                >
                  Continue to Details
                </button>
              </div>
            </div>
          ) : (
            /* --- STEP 2: CONFIRMATION & GUEST INFO --- */
            <form onSubmit={handleCheckoutSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#64748B" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>Contact Information</h2>
              </div>

              {/* DYNAMIC AUTH RENDERING */}
              {isAuthenticated ? (
                <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", padding: "16px", borderRadius: "8px", marginBottom: "32px" }}>
                  <p style={{ margin: 0, color: "#166534", fontSize: "0.95rem" }}>
                    ✅ You are logged in as <strong>{username}</strong>. 
                    Your tickets will be attached to your account automatically!
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                  <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem", marginBottom: "8px" }}>
                    You are checking out as a guest. We need your email to send you the tickets!
                  </p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Full Name</label>
                    <input required type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="e.g., Jane Doe" style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Email Address</label>
                    <input required type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="Where should we send your ticket?" style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="submit"
                  style={{ padding: "14px 32px", backgroundColor: "#D24000", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer", width: "100%" }}
                >
                  {isFree ? "Complete Registration" : `Pay KES ${total}`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary (Sticky) */}
        <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", position: "sticky", top: "100px" }}>
            <img src={getImageUrl(event.image)} alt="Event" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0F172A", margin: "0 0 8px 0" }}>Order summary</h3>
              <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 16px 0", fontWeight: "600" }}>{event.title}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid #E2E8F0" }}>
                <span style={{ color: "#475569" }}>{quantity} x General Admission</span>
                <span style={{ color: "#475569" }}>{isFree ? "Free" : `KES ${event.ticket_price}`}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontWeight: "700", fontSize: "1.1rem", color: "#0F172A" }}>
                <span>Total</span>
                <span>{isFree ? "Free" : `KES ${total}`}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
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

  //  NEW: We now track an array of attendees!
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);

  //const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://eventify-api-zm3d.onrender.com/api/events/${id}/`)
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
    return `https://eventify-api-zm3d.onrender.com${imagePath}`;
  };

  // Dynamically update the number of forms when quantity changes
  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
    const newAttendees = [...attendees];
    while (newAttendees.length < newQty) {
      newAttendees.push({ name: "", email: "" }); // Add blank forms
    }
    while (newAttendees.length > newQty) {
      newAttendees.pop(); // Remove extra forms
    }
    setAttendees(newAttendees);
  };

  const handleAttendeeChange = (index: number, field: "name" | "email", value: string) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index][field] = value;
    setAttendees(updatedAttendees);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    // NEW: Send the array of attendees to Django
    const orderPayload = {
      event_id: id,
      attendees: attendees, 
    };

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Token ${token}`;

      const response = await fetch("https://eventify-api-zm3d.onrender.com/api/tickets/purchase/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/confirmation/${id}`, { 
          state: { ticketData: data, eventImage: event?.image } 
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
        
        {/* LEFT COLUMN */}
        <div style={{ flex: "1 1 500px", backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          
          {step === 1 ? (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "24px" }}>Select Tickets</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "24px", borderBottom: "1px solid #E2E8F0" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#0F172A", margin: "0 0 4px 0" }}>General Admission</h3>
                  <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem" }}>{isFree ? "Free" : `KES ${event.ticket_price}`}</p>
                </div>
                <select 
                  value={quantity} 
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }}
                >
                  {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setStep(2)} style={{ padding: "14px 32px", backgroundColor: "#D24000", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" }}>
                  Continue to Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#64748B" style={{ width: "20px", height: "20px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                </button>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>Attendee Details</h2>
              </div>

              {/*  NEW: DYNAMICALLY RENDER FORMS BASED ON QUANTITY */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
                {attendees.map((attendee, index) => (
                  <div key={index} style={{ padding: "16px", border: "1px solid #E2E8F0", borderRadius: "8px", backgroundColor: "#F8FAFC" }}>
                    <h4 style={{ margin: "0 0 16px 0", color: "#334155", fontSize: "1rem" }}>Ticket {index + 1}</h4>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569", display: "block", marginBottom: "4px" }}>Full Name</label>
                        <input required type="text" value={attendee.name} onChange={(e) => handleAttendeeChange(index, "name", e.target.value)} placeholder="e.g., Jane Doe" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", width: "100%", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569", display: "block", marginBottom: "4px" }}>Email Address {index === 0 && "(Receipt sent here)"}</label>
                        <input required type="email" value={attendee.email} onChange={(e) => handleAttendeeChange(index, "email", e.target.value)} placeholder="jane@example.com" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #CBD5E1", width: "100%", boxSizing: "border-box" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" style={{ padding: "14px 32px", backgroundColor: "#D24000", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer", width: "100%" }}>
                  {isFree ? "Complete Registration" : `Pay KES ${total}`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
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
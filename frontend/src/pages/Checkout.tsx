import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // We use state to switch between "Select Tickets" (Step 1) and "Contact Info" (Step 2)
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // Mock event data (in the future, fetch this using the 'id')
  const event = {
    title: "HealthTech & Entrepreneurship Summit 2026",
    date: "Saturday, March 28, 2026 • 9:00 AM EAT",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    price: "Free",
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here is where you would normally send the data to your backend!
    // For now, we instantly route them to the success page.
    navigate(`/confirmation/${id}`);
  };

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
                  <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem" }}>{event.price}</p>
                </div>
                
                {/* Quantity Dropdown */}
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
                  Register
                </button>
              </div>
            </div>
          ) : (
            /* --- STEP 2: CONTACT INFO --- */
            <form onSubmit={handleCheckoutSubmit}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#64748B" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>Contact Information</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", color: "#334155" }}>First name *</label>
                  <input required type="text" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem", outlineColor: "#14B8A6" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: "500", color: "#334155" }}>Last name *</label>
                  <input required type="text" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem", outlineColor: "#14B8A6" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "32px" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: "500", color: "#334155" }}>Email address *</label>
                <input required type="email" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem", outlineColor: "#14B8A6" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="submit"
                  style={{ padding: "14px 32px", backgroundColor: "#D24000", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer", width: "100%" }}
                >
                  Complete Registration
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary (Sticky) */}
        <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", position: "sticky", top: "100px" }}>
            <img src={event.image} alt="Event" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0F172A", margin: "0 0 8px 0" }}>Order summary</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingBottom: "16px", borderBottom: "1px solid #E2E8F0" }}>
                <span style={{ color: "#475569" }}>{quantity} x General Admission</span>
                <span style={{ color: "#475569" }}>{event.price}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontWeight: "700", fontSize: "1.1rem", color: "#0F172A" }}>
                <span>Total</span>
                <span>{event.price}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
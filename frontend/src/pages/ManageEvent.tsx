import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ManageEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // --- State for Email Blast ---
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [blastStatus, setBlastStatus] = useState<string | null>(null);

  // --- State for Event Update ---
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // --- Handlers ---
  const handleSendBlast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setBlastStatus(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://eventify-api-zm3d.onrender.com/api/tickets/dashboard/${id}/blast/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subject, message })
      });

      const data = await response.json();

      if (response.ok) {
        setBlastStatus(" " + data.message);
        setSubject("");
        setMessage("");
      } else {
        setBlastStatus("Error: " + (data.error || "Failed to send email."));
      }
    } catch (err) {
      console.error(err);
      setBlastStatus("Network error. Check console.");
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateStatus(null);
    const token = localStorage.getItem("token");

    try {
      // Create a payload with only the fields they actually typed in
      const payload: any = {};
      if (editTitle) payload.title = editTitle;
      if (editPrice) payload.ticket_price = editPrice;

      if (Object.keys(payload).length === 0) {
        setUpdateStatus(" Please enter at least one field to update.");
        setIsUpdating(false);
        return;
      }

      const response = await fetch(`https://eventify-api-zm3d.onrender.com/api/events/${id}/update/`, {
        method: "PATCH",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateStatus("" + data.message);
        setEditTitle("");
        setEditPrice("");
      } else {
        setUpdateStatus(" Error: " + (data.error || "Failed to update event."));
      }
    } catch (err) {
      console.error(err);
      setUpdateStatus(" Network error. Check console.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Navigation */}
        <button onClick={() => navigate(`/dashboard/${id}`)} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "1rem", padding: 0 }}>
          ← Back to Dashboard
        </button>

        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", marginBottom: "32px" }}>Manage Event</h1>

        {/* SECTION 1: Email Attendees */}
        <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "1.5rem" }}></span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>Email All Attendees</h2>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: "24px" }}>
            Send an important update, location change, or reminder to everyone who has purchased a ticket. Emails are sent via BCC to protect privacy.
          </p>

          <form onSubmit={handleSendBlast} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input 
              type="text" 
              required
              placeholder="Subject (e.g., URGENT: Room Change)" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem", width: "100%", boxSizing: "border-box" }}
            />
            
            <textarea 
              required
              placeholder="Write your message here..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem", width: "100%", boxSizing: "border-box", resize: "vertical" }}
            />

            <button 
              type="submit" 
              disabled={isSending}
              style={{ padding: "14px 24px", backgroundColor: "#0F172A", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: isSending ? "not-allowed" : "pointer", opacity: isSending ? 0.7 : 1, alignSelf: "flex-start" }}
            >
              {isSending ? "Sending Blast..." : "Send Email Blast"}
            </button>

            {blastStatus && (
              <div style={{ marginTop: "8px", padding: "12px", backgroundColor: blastStatus.includes("✅") ? "#F0FDF4" : "#FEF2F2", color: blastStatus.includes("✅") ? "#166534" : "#991B1B", borderRadius: "8px", fontWeight: "500" }}>
                {blastStatus}
              </div>
            )}
          </form>
        </div>

        {/* SECTION 2: Update Event Details */}
        <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "1.5rem" }}></span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0F172A", margin: 0 }}>Update Event Details</h2>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: "24px" }}>
            Need to change the title or adjust the ticket price? Enter the new details below. Leave fields blank if you don't want to change them.
          </p>

          <form onSubmit={handleUpdateEvent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569", display: "block", marginBottom: "4px" }}>New Event Title</label>
              <input 
                type="text" 
                placeholder="Leave blank to keep current title" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem", width: "100%", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#475569", display: "block", marginBottom: "4px" }}>New Ticket Price (KES)</label>
              <input 
                type="number" 
                placeholder="Leave blank to keep current price" 
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem", width: "100%", boxSizing: "border-box" }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              style={{ padding: "14px 24px", backgroundColor: "#3B82F6", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: isUpdating ? "not-allowed" : "pointer", opacity: isUpdating ? 0.7 : 1, alignSelf: "flex-start", marginTop: "8px" }}
            >
              {isUpdating ? "Saving Changes..." : "Save Changes"}
            </button>

            {updateStatus && (
              <div style={{ marginTop: "8px", padding: "12px", backgroundColor: updateStatus.includes("✅") ? "#F0FDF4" : updateStatus.includes("⚠️") ? "#FFFBEB" : "#FEF2F2", color: updateStatus.includes("✅") ? "#166534" : updateStatus.includes("⚠️") ? "#B45309" : "#991B1B", borderRadius: "8px", fontWeight: "500" }}>
                {updateStatus}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
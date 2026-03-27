import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  
  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0.00");
  const [capacity,setcapacity] = useState("100");
  const [description, setDescription] = useState("");
  
  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle Image Selection and generate a live preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Creates a temporary URL to show the image instantly
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // CRITICAL: Because we are sending an image file, we MUST use FormData, not standard JSON!
    const formData = new FormData();
    formData.append("title", title);
    // Combine date and time for Django's DateTimeField
    formData.append("date", `${date}T${time}:00Z`); 
    formData.append("location", location);
    formData.append("ticket_price", price);
    formData.append("description", description);
    formData.append("capacity", capacity);
    if (imageFile) {
      console.log("SUCCESS: Image found in React state! Attaching to package...");
      // We explicitly pass the file name as the third argument so the browser doesn't drop it
      formData.append("image", imageFile, imageFile.name); 
    } else {
      console.warn("WARNING: No image selected! Sending text only.");
    }
    try {
      // THE REAL BACKEND CONNECTION
      const response = await fetch('http://127.0.0.1:8000/api/events/create/', {
        method: 'POST',
        body: formData, // The browser handles the multipart boundaries automatically!
      });

      if (response.ok) {
        const createdEvent = await response.json();
        alert("Event published successfully!");
        navigate(`/event/${createdEvent.id}`); // Redirect to home so you can see it in the grid!
      } else {
        const errorData = await response.json();
        console.error("Django validation error:", errorData);
        alert(`Failed to create event. Django says: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Is your Django server running?");
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>Create a New Event</h1>
        <p style={{ color: "#64748B", marginBottom: "32px" }}>Fill out the details below to publish your event to the campus.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* 1. IMAGE UPLOAD SECTION */}
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>Event Poster / Banner</label>
            <div 
              style={{ 
                border: "2px dashed #CBD5E1", 
                borderRadius: "8px", 
                padding: imagePreview ? "0" : "40px", 
                textAlign: "center",
                backgroundColor: "#F8FAFC",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onClick={() => document.getElementById("posterUpload")?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "contain", display: "block" }} />
              ) : (
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#94A3B8" style={{ width: "40px", height: "40px", margin: "0 auto 8px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p style={{ color: "#475569", margin: 0, fontWeight: "500" }}>Click to upload a poster</p>
                  <p style={{ color: "#94A3B8", fontSize: "0.85rem", marginTop: "4px" }}>PNG, JPG up to 5MB</p>
                </div>
              )}
              <input 
                id="posterUpload" 
                type="file" 
                accept="image/png, image/jpeg" 
                style={{ display: "none" }} 
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* 2. BASIC DETAILS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Event Title</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Campus Hackathon 2026" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Date</label>
              <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Time</label>
              <input required type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Location</label>
              <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., KU Amphitheatre" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Price (KES)</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Free or 500" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: "600", color: "#334155" }}>Description</label>
            <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this event about?" style={{ padding: "12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "1rem", fontFamily: "inherit" }} />
          </div>

          {/* 3. SUBMIT BUTTON */}
          <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "8px 0" }} />
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
            <button type="button" onClick={() => navigate("/")} style={{ padding: "14px 24px", backgroundColor: "white", color: "#64748B", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "14px 32px", backgroundColor: "#14B8A6", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer" }}>
              Publish Event
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
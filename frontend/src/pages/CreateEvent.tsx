import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0");
  const [isFree, setIsFree] = useState(true);
  const [capacity, setCapacity] = useState("100");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("campus");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", `${date}T${time}:00Z`);
    formData.append("location", location);
    formData.append("ticket_price", isFree ? "0" : price);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile, imageFile.name);

    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {};
      if (token) headers["Authorization"] = `Token ${token}`;

      const response = await fetch("https://eventify-api-zm3d.onrender.com/api/events/create/", {
        method: "POST",
        headers,
        body: formData,
      });

      if (response.ok) {
        const createdEvent = await response.json();
        navigate(`/event/${createdEvent.slug}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to create event: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert("Network error. Is your Django server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    padding: "12px 14px", borderRadius: "8px",
    border: "1.5px solid #E2E8F0", fontSize: "0.95rem",
    width: "100%", boxSizing: "border-box" as const,
    outline: "none", transition: "border-color 0.2s",
    fontFamily: "inherit", backgroundColor: "white",
    color: "#0F172A"
  };

  const labelStyle = {
    fontSize: "0.85rem", fontWeight: "600" as const,
    color: "#475569", display: "block" as const, marginBottom: "6px"
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
            Create a New Event
          </h1>
          <p style={{ color: "#64748B", margin: 0 }}>Fill out the details below to publish your event.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* SECTION: Image */}
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "28px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
               Event Banner
            </h2>
            <div
              style={{
                border: `2px dashed ${imagePreview ? "#14B8A6" : "#CBD5E1"}`,
                borderRadius: "12px",
                padding: imagePreview ? "0" : "48px 24px",
                textAlign: "center",
                backgroundColor: "#F8FAFC",
                cursor: "pointer",
                overflow: "hidden",
                transition: "border-color 0.2s"
              }}
              onClick={() => document.getElementById("posterUpload")?.click()}
            >
              {imagePreview ? (
                <div style={{ position: "relative" }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "280px", objectFit: "cover", display: "block" }} />
                  <div style={{
                    position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    opacity: 0, transition: "opacity 0.2s"
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                  >
                    <span style={{ color: "white", fontWeight: "600", fontSize: "0.9rem" }}>Click to change image</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}></div>
                  <p style={{ color: "#475569", margin: "0 0 4px 0", fontWeight: "600" }}>Click to upload a poster</p>
                  <p style={{ color: "#94A3B8", fontSize: "0.82rem", margin: 0 }}>PNG or JPG, up to 5MB. Recommended: 1200×630px</p>
                </div>
              )}
              <input id="posterUpload" type="file" accept="image/png,image/jpeg" style={{ display: "none" }} onChange={handleImageChange} />
            </div>
          </div>

          {/* SECTION: Basic Info */}
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "28px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 20px 0" }}>
               Basic Details
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Campus Hackathon 2026" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                  <option value="hackathon">Hackathon</option>
                  <option value="tech-summit">Tech Summit</option>
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking</option>
                  <option value="campus">Campus Life</option>
                  <option value="club">Club</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description *</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this event about? Who should attend?" style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>
          </div>

          {/* SECTION: Date, Time, Location */}
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "28px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 20px 0" }}>
               When & Where
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Time *</label>
                  <input required type="time" value={time} onChange={e => setTime(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Location *</label>
                <input required type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., KU Main Auditorium, Nairobi" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* SECTION: Tickets */}
          <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "28px", marginBottom: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 20px 0" }}>
               Tickets
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Free / Paid toggle */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsFree(true)}
                  style={{
                    flex: 1, padding: "12px", borderRadius: "10px", cursor: "pointer",
                    border: `2px solid ${isFree ? "#14B8A6" : "#E2E8F0"}`,
                    backgroundColor: isFree ? "#F0FDFA" : "white",
                    color: isFree ? "#0F766E" : "#64748B",
                    fontWeight: "600", fontSize: "0.9rem", transition: "all 0.2s"
                  }}
                >
                   Free Event
                </button>
                <button
                  type="button"
                  onClick={() => setIsFree(false)}
                  style={{
                    flex: 1, padding: "12px", borderRadius: "10px", cursor: "pointer",
                    border: `2px solid ${!isFree ? "#D24000" : "#E2E8F0"}`,
                    backgroundColor: !isFree ? "#FFF7ED" : "white",
                    color: !isFree ? "#D24000" : "#64748B",
                    fontWeight: "600", fontSize: "0.9rem", transition: "all 0.2s"
                  }}
                >
                   Paid Event
                </button>
              </div>

              {!isFree && (
                <div>
                  <label style={labelStyle}>Ticket Price (KES) *</label>
                  <input
                    required={!isFree} type="number" min="1" value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="e.g., 500"
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>Capacity (max attendees)</label>
                <input type="number" min="1" value={capacity} onChange={e => setCapacity(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button" onClick={() => navigate("/")}
              style={{ padding: "14px 24px", backgroundColor: "white", color: "#64748B", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", fontWeight: "600", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={isSubmitting}
              style={{ padding: "14px 36px", backgroundColor: isSubmitting ? "#94A3B8" : "#14B8A6", color: "white", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "700", cursor: isSubmitting ? "not-allowed" : "pointer", transition: "background 0.2s" }}
            >
              {isSubmitting ? "Publishing..." : "Publish Event "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
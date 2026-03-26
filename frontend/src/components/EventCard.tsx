export default function EventCards() {
  // Mock data for our event cards
  const events = [
    {
      id: 1,
      title: "IEEE EMBS Entrepreneurship Forum 2026",
      date: "Mon, Mar 16 • 9:00 AM",
      location: "Kenyatta University Main Campus",
      price: "Free",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&auto=format&fit=crop&q=60",
      badge: "Going fast",
      badgeColor: "#FEE2E2", // Light red
      badgeTextColor: "#991B1B",
    },
    {
      id: 2,
      title: "Kenya Tech Summit",
      date: "Thu, Jul 30 • 10:00 AM",
      location: "Sarit Expo Centre",
      price: "From KES 1,500",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
      badge: "Almost full",
      badgeColor: "#FCE7F3", // Light pink
      badgeTextColor: "#9D174D",
    },
    {
      id: 3,
      title: "SomaBuddy App Beta Launch",
      date: "Fri, Apr 10 • 4:00 PM",
      location: "Nairobi Garage, Kilimani",
      price: "Free",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      badge: "New",
      badgeColor: "#E0E7FF", // Light indigo
      badgeTextColor: "#3730A3",
    },
    {
      id: 4,
      title: "Linux & Cloud Engineering Study Group",
      date: "Sat, Apr 18 • 2:00 PM",
      location: "iHub Nairobi",
      price: "Free",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=60",
      badge: null,
    },
    {
      id: 5,
      title: "Founders Live Nairobi",
      date: "Thu, Apr 30 • 5:00 PM",
      location: "Antler East Africa",
      price: "Free",
      image: "https://images.unsplash.com/photo-1475721025505-c31da16c60f5?w=800&auto=format&fit=crop&q=60",
      badge: "Sales end soon",
      badgeColor: "#F3F4F6", // Light gray
      badgeTextColor: "#1F2937",
    },
    {
      id: 6,
      title: "Intro to MLOps Workshop",
      date: "Wed, May 6 • 1:00 PM",
      location: "Online",
      price: "Free",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60",
      badge: null,
    },
    {
      id: 7,
      title: "IoT Data Pipelines",
      date: "Tue, May 12 • 9:00 AM",
      location: "Kenyatta University",
      price: "Free",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
      badge: "Going fast",
      badgeColor: "#FEE2E2", 
      badgeTextColor: "#991B1B",
    },
    {
      id: 8,
      title: "Kenyatta University Primary School  Drive",
      date: "Sat, May 16 • 8:00 AM",
      location: "Kenyatta University Primary School primary GIveback ",
      price: "Volunteer",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60",
      badge: null,
    }
  ];

  return (
    <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      
      {/* 1. SECTION HEADER & FILTERS */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0F172A", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          Trending events in <span style={{ color: "#14B8A6", cursor: "pointer" }}>Nairobi 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px", display: "inline", marginLeft: "4px", verticalAlign: "middle" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </h2>
        
        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#14B8A6", borderBottom: "2px solid #14B8A6", paddingBottom: "8px", cursor: "pointer" }}>All</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>For you</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>Today</span>
          <span style={{ fontSize: "0.95rem", fontWeight: "500", color: "#64748B", cursor: "pointer" }}>This weekend</span>
        </div>
      </div>

      {/* 2. THE CSS GRID FOR CARDS */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "24px 20px" 
        }}
      >
        {events.map((event) => (
          <div 
            key={event.id} 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              cursor: "pointer",
             
            }}
          >
            {/* Event Image */}
            <div 
              style={{ 
                width: "100%", 
                aspectRatio: "3/2", 
                borderRadius: "12px", 
                overflow: "hidden",
                marginBottom: "12px",
                position: "relative"
              }}
            >
              <img 
                src={event.image} 
                alt={event.title} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  transition: "transform 0.3s ease"
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
              
              {/* Optional "Like/Save" Heart Icon on the image */}
              <div 
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#475569" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
            </div>

            {/* Event Details */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Conditional Badge */}
              {event.badge && (
                <span 
                  style={{ 
                    alignSelf: "flex-start",
                    backgroundColor: event.badgeColor, 
                    color: event.badgeTextColor,
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    textTransform: "capitalize"
                  }}
                >
                  {event.badge}
                </span>
              )}

              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0F172A", margin: "0 0 4px 0", lineHeight: 1.3 }}>
                {event.title}
              </h3>
              
              <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#D97706", margin: "0 0 2px 0" }}> {/* Eventbrite uses a distinct color for dates */}
                {event.date}
              </p>
              
              <p style={{ fontSize: "0.9rem", color: "#64748B", margin: "0 0 8px 0" }}>
                {event.location}
              </p>
              
              <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155", marginTop: "auto" }}>
                {event.price}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
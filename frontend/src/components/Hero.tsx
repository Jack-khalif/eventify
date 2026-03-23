export default function Hero() {
  // Good starting image (vibrant but not too busy; change if you want)
  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80";

  return (
    <section
      style={{
        position: "relative",
        height: "50vh",               // ← reduced from 90vh — less "too big"
        minHeight: "500px",
        maxHeight: "700px",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Stronger blending overlay – navy gradient for uniformity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.85) 100%)", // softer top → darker bottom
          zIndex: 1,
        }}
      />

      {/* Optional subtle radial glow for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(20, 184, 166, 0.08) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Main content – centered, smaller than before */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          padding: "0 24px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 4.2rem)", // responsive but not huge
            fontWeight: "800",
            marginBottom: "1.2rem",
            lineHeight: 1.1,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)", // subtle shadow for blending/readability
          }}
        >
          Discover Amazing Events Near You
        </h1>

        <p
          style={{
            fontSize: "clamp(1.2rem, 3.5vw, 1.4rem)",
            opacity: 0.95,
            marginBottom: "2.5rem",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          Concerts, tech conferences, festivals, workshops and more — happening in Nairobi and beyond.
        </p>

        {/* Search bar – Eventbrite-inspired pill shape */}
        <div
          style={{
            display: "flex",
            maxWidth: "620px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "50px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          }}
        >
          <input
            type="text"
            placeholder="Search events, artists, venues..."
            style={{
              flex: 1,
              padding: "16px 24px",
              border: "none",
              fontSize: "1.1rem",
              background: "transparent",
              outline: "none",
              color: "#0F172A",
            }}
          />
          <button
            style={{
              backgroundColor: "#14B8A6",
              color: "white",
              border: "none",
              padding: "0 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0EA78E")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#14B8A6")}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
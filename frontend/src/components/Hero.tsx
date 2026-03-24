export default function Hero() {
  // Using your vibrant starting image
  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80";

  return (
    // 1. Outer wrapper gives spacing on the left and right sides
    <section
      style={{
        padding: "0 24px",
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* 2. The inner div is the actual "Card" for the Hero */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px", // Limits how wide the banner gets on big screens
          minHeight: "450px", // Shorter height matches the Eventbrite look
          borderRadius: "20px", // The smooth rounded corners
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay to make the highlighted text pop more */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />

        {/* 3. Main Content Wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px", // Spacing between the text lines
          }}
        >
          {/* Small Top Badge ("GET INTO IT") */}
          <div>
            <span
              style={{
                backgroundColor: "#FBCFE8", // Soft pink
                color: "#111827", // Dark text for contrast
                padding: "4px 12px",
                fontWeight: "800",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Get Into It
            </span>
          </div>

          {/* Large Highlighted Text Blocks */}
          <h1
            style={{
              margin: 0,
              lineHeight: 1.4, // Increased slightly to separate the background blocks
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                backgroundColor: "#93C5FD", // Soft blue
                color: "#111827",
                padding: "4px 16px",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)", // Responsive sizing
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              From Pop Ballads
            </span>
            <span
              style={{
                backgroundColor: "#93C5FD",
                color: "#111827",
                padding: "4px 16px",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight: "900",
                textTransform: "uppercase",
              }}
            >
              To Emo Encores
            </span>
          </h1>

          {/* 4. White Pill CTA Button */}
          <button
            style={{
              marginTop: "16px",
              padding: "14px 32px",
              backgroundColor: "white",
              color: "#111827",
              borderRadius: "50px", // Makes it a pill shape
              border: "none",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Get Into Live Music
          </button>
        </div>
      </div>
    </section>
  );
}
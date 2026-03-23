export default function Hero() {
  // Pick one image — change this URL when you want to test others
  const heroImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80";

  return (
    <section
      style={{
        position: "relative",
        height: "90vh",               // almost full viewport height
        minHeight: "600px",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Dark overlay + subtle gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85))", // navy dark overlay
          zIndex: 1,
        }}
      />

      {/* Content on top */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)", // responsive size
            fontWeight: "bold",
            marginBottom: "1.5rem",
            lineHeight: 1.1,
          }}
        >
          Discover Amazing Events Near You
        </h1>

        <p
          style={{
            fontSize: "clamp(1.125rem, 4vw, 1.5rem)",
            opacity: 0.9,
            marginBottom: "2.5rem",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Concerts, tech conferences, festivals, workshops and more — all in one place.
        </p>

        {/* Search bar – centered, bigger, modern */}
        <div
          style={{
            display: "flex",
            maxWidth: "600px",
            margin: "0 auto",
            background: "white",
            borderRadius: "9999px", // pill shape
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          <input
            placeholder="Search events, artists, cities..."
            style={{
              flex: 1,
              padding: "18px 24px",
              border: "none",
              fontSize: "1.1rem",
              outline: "none",
            }}
          />
          <button
            style={{
              background: "#14B8A6",
              color: "white",
              border: "none",
              padding: "0 32px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
export default function CategoryIcons() {
  const categories = [
    { name: "Hackathons", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> },
    { name: "Tech Summits", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> },
    { name: "Workshops", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
    { name: "Networking", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { name: "Campus Life", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /> },
    { name: "Clubs", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> }
  ];

  // Since we need TWO sets of icons for the infinite loop, we define the JSX as a variable
  // that we can repeat inside the main render.
  const CategoryIconItem = ({ item }: { item: typeof categories[0] }) => (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        cursor: "pointer",
        minWidth: "200px", // Increased slighty so they are more spread out
      }}
    >
      <div 
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "1px solid #E2E8F0", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
          color: "#475569", 
          transition: "all 0.2s ease",
          backgroundColor: "white", // Clean white background for the circles
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#14B8A6"; 
          e.currentTarget.style.color = "#14B8A6";       
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(20, 184, 166, 0.2)";
          e.currentTarget.style.transform = "translateY(-3px)"; // Slight lift on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E2E8F0";
          e.currentTarget.style.color = "#475569";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          style={{ width: "32px", height: "32px" }}
        >
          {item.icon}
        </svg>
      </div>
      <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1E293B", textAlign: "center" }}>
        {item.name}
      </span>
    </div>
  );

  return (
    <section 
      style={{ 
        maxWidth: "100vw", // Full viewport width
        margin: "0 auto", 
        padding: "40px 0", // Reduced horizontal padding as it will overflow anyway
        overflow: "hidden", // Crucial! Hides the extra icons as they scroll off screen
        position: "relative",
      }}
    >
      {/* This is a classic technique to inject CSS Keyframes into a React component 
        without a separate CSS file. We are defining the 'scroll' animation.
      */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100%)); } 
          /* We scroll the container the width of exactly ONE set of icons */
        }
      `}</style>

      <div 
        style={{ 
          display: "flex", 
          alignItems: "center",
          gap: "40px", // Space between items
          // -----------------------------------------------------------------
          //  THE MAGIC: The Animation definition
          // e scroll, very slowly (60 seconds for a full loop), infinitely, and linearly.
          // -----------------------------------------------------------------
          animation: "scroll 60s linear infinite", 
          // -----------------------------------------------------------------
          //  RESPONSIVENESS: Stop animation on hover
          // This must be added as a JS onMouseEnter/onMouseLeave to pause INLINE styles.
          // We apply the animation to the wrapper div.
          // -----------------------------------------------------------------
          width: "max-content", // Important: Keeps the icons in one single ultra-wide row
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused" }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running" }}
      >
        {/* Set 1: The Original Icons */}
        {categories.map((category, index) => (
          <CategoryIconItem key={`original-${index}`} item={category} />
        ))}

        {/* Set 2: The Duplicated Icons for the seamless loop */}
        {/*
          When the original Set 1 scrolls completely off screen, 
          the animation resets to 0%. Set 2 looks exactly like Set 1, 
          so the eye never notices the jump back to the start!
        */}
        {categories.map((category, index) => (
          <CategoryIconItem key={`duplicate-${index}`} item={category} />
        ))}
      </div>
    </section>
  );
}
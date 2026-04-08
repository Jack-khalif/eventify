import { useNavigate } from "react-router-dom";

export default function CategoryIcons() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Hackathons", filter: "hackathon",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    },
    {
      name: "Tech Summits", filter: "tech-summit",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    },
    {
      name: "Workshops", filter: "workshop",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    },
    {
      name: "Networking", filter: "networking",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    },
    {
      name: "Campus Life", filter: "campus",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    },
    {
      name: "Clubs", filter: "club",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    }
  ];

  return (
    <section style={{ maxWidth: "100vw", margin: "0 auto", padding: "40px 0", overflow: "hidden", position: "relative" }}>
      <style>{`
        @keyframes pingpong {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        @media (min-width: 1024px) {
          .icon-track { animation: none !important; justify-content: center !important; transform: translateX(0) !important; }
        }
        .category-icon-btn:hover .icon-circle {
          border-color: #14B8A6 !important;
          color: #14B8A6 !important;
          box-shadow: 0 6px 16px rgba(20, 184, 166, 0.2) !important;
          transform: translateY(-4px) !important;
        }
      `}</style>

      <div
        className="icon-track"
        style={{
          display: "flex", gap: "48px", width: "max-content",
          margin: "0 auto",
          animation: "pingpong 4s ease-in-out infinite alternate",
          padding: "0 24px"
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-icon-btn"
            onClick={() => navigate(`/events?category=${category.filter}`)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              cursor: "pointer", minWidth: "90px", background: "none",
              border: "none", padding: "8px", borderRadius: "12px",
              transition: "background 0.2s"
            }}
          >
            <div
              className="icon-circle"
              style={{
                width: "72px", height: "72px", borderRadius: "50%",
                border: "1.5px solid #E2E8F0", display: "flex",
                alignItems: "center", justifyContent: "center",
                marginBottom: "10px", color: "#475569",
                transition: "all 0.2s ease", backgroundColor: "white",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" style={{ width: "28px", height: "28px" }}>
                {category.icon}
              </svg>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1E293B", textAlign: "center", whiteSpace: "nowrap" }}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
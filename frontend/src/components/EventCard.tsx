import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  id: string;
  slug:string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  isPast?: boolean;
}

export default function EventCard({ slug,title, date, location, price, image, isPast = false }: EventCardProps) {
  const navigate = useNavigate();

  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60";
    if (imagePath.startsWith('http')) return imagePath;
    return `https://eventify-api-zm3d.onrender.com${imagePath}`;
  };

  const formatEventDate = (isoString: string) => {
    if (!isoString) return "Date TBA";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }).replace(',', ' •');
  };

  return (
    <div
      onClick={() => navigate(`/event/${slug}`)}
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        opacity: isPast ? 0.65 : 1,
        filter: isPast ? "grayscale(60%)" : "none",
      }}
      onMouseEnter={e => {
        if (!isPast) {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", overflow: "hidden" }}>
        <img
          src={getImageUrl(image)}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {isPast && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            backgroundColor: "rgba(0,0,0,0.6)", color: "white",
            fontSize: "0.75rem", fontWeight: "700", padding: "4px 10px",
            borderRadius: "20px", letterSpacing: "0.05em", textTransform: "uppercase"
          }}>
            Past Event
          </div>
        )}
        {/* Price badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          backgroundColor: price === "0" || price === "Free" || !price ? "#14B8A6" : "#D24000",
          color: "white", fontSize: "0.8rem", fontWeight: "700",
          padding: "4px 10px", borderRadius: "20px"
        }}>
          {price === "0" || !price ? "Free" : `KES ${price}`}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#D97706", margin: 0, fontWeight: "600" }}>
           {formatEventDate(date)}
        </p>
        <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
           {location || "Location TBA"}
        </p>
      </div>
    </div>
  );
}
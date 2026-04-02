import { useNavigate } from 'react-router-dom';

//  Props for ONE event
interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  price,
  image
}: EventCardProps) {

  const navigate = useNavigate();

  //  Helper functions (KEEP THESE)
  const getImageUrl = (imagePath: string | undefined | null) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60";
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `https://eventify-api-zm3d.onrender.com${imagePath}`;
  };

  const formatEventDate = (isoString: string) => {
    if (!isoString) return "Date TBA";
    const dateObj = new Date(isoString);
    return dateObj
      .toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
      .replace(',', ' •');
  };

  return (
    <div
      onClick={() => navigate(`/event/${id}`)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "3/2",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "12px"
        }}
      >
        <img
          src={getImageUrl(image)}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>
        {title}
      </h3>

      <p style={{ fontSize: "0.9rem", color: "#D97706" }}>
        {formatEventDate(date)}
      </p>

      <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
        {location || "Location TBA"}
      </p>

      <p style={{ fontWeight: "600" }}>
        {price || "Free"}
      </p>
    </div>
  );
}
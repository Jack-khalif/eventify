export default function Loader() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "60vh", // Takes up most of the screen
      width: "100%"
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* The Spinner */}
      <div 
        style={{ 
          width: "48px", 
          height: "48px", 
          border: "4px solid #E2E8F0", // Light gray track
          borderTop: "4px solid #14B8A6", // Teal brand color moving
          borderRadius: "50%", 
          animation: "spin 1s linear infinite" 
        }} 
      />
      
      <p style={{ marginTop: "16px", color: "#64748B", fontWeight: "500", fontSize: "0.95rem" }}>
        Loading event details...
      </p>
    </div>
  );
}
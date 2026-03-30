import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScannerPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("Point camera at a ticket QR code");
  const [details, setDetails] = useState("");
  
  // This acts as our "lock" so the scanner doesn't fire 100 times a second
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (detectedCodes: any) => {
    // If we are currently verifying a ticket, or if no code was detected, do nothing
    if (isProcessing || !detectedCodes || detectedCodes.length === 0) return;

    // Grab the actual text (the Ticket ID) from the QR code
    const ticketId = detectedCodes[0].rawValue;
    if (!ticketId) return;

    // Lock the scanner and update the UI
    setIsProcessing(true);
    setStatus("idle");
    setMessage("Verifying...");
    setDetails("");

    try {
      //  Send the ID to our Django Bouncer
      const response = await fetch("http://127.0.0.1:8000/api/tickets/scan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket_id: ticketId }),
      });

      const data = await response.json();

      if (response.ok) {
        // IT WORKED!
        setStatus("success");
        setMessage(data.message); // e.g., "VALID TICKET"
        setDetails(data.details); // e.g., "Admit 1: Jane Doe to Tech Forum"
      } else {
        //  REJECTED (Already Scanned or Fake)
        setStatus("error");
        setMessage(data.message); 
        setDetails(data.details);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("NETWORK ERROR");
      setDetails("Could not connect to the server.");
    }

    //  Wait 3 seconds, then unlock the scanner for the next person in line
    setTimeout(() => {
      setStatus("idle");
      setMessage("Ready for next ticket");
      setDetails("");
      setIsProcessing(false);
    }, 3000);
  };

  // Helper function to change the background colors dynamically
  const getStatusColor = () => {
    if (status === "success") return "#10B981"; // Bright Green
    if (status === "error") return "#EF4444";   // Bright Red
    return "#3B82F6";                           // Blue (Waiting)
  };

  return (
    <div style={{ backgroundColor: "#0F172A", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      
      {/* Top Header */}
      <div style={{ padding: "24px", textAlign: "center", backgroundColor: "#1E293B", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "white", margin: 0, fontSize: "1.5rem", fontWeight: "700", letterSpacing: "1px" }}>DOOR SCANNER</h1>
      </div>

      {/* Camera Viewport */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: "500px", borderRadius: "24px", overflow: "hidden", border: `6px solid ${getStatusColor()}`, transition: "border-color 0.3s ease", boxShadow: `0 0 40px ${getStatusColor()}40` }}>
          <Scanner 
            onScan={handleScan} 
            formats={["qr_code"]}
            styles={{ container: { width: "100%", paddingTop: "100%" } }} // Keeps it perfectly square
          />
        </div>
      </div>

      {/* Dynamic Status Panel at the bottom */}
      <div style={{ padding: "32px 24px", backgroundColor: getStatusColor(), color: "white", textAlign: "center", transition: "background-color 0.3s ease", minHeight: "180px", display: "flex", flexDirection: "column", justifyContent: "center", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "900", margin: "0 0 8px 0", letterSpacing: "2px" }}>
          {message}
        </h2>
        <p style={{ fontSize: "1.2rem", margin: 0, fontWeight: "600", opacity: 0.9 }}>
          {details}
        </p>
      </div>

    </div>
  );
}
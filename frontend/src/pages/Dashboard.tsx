import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

// TypeScript Blueprint for our Django data
interface DashboardData {
  event_title: string;
  total_sold: number;
  total_revenue: number;
  scanned_count: number;
  recent_sales: Array<{
    ticket_id: string;
    buyer: string;
    email: string;
    date: string;
    is_scanned: boolean;
  }>;
}

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // SECURITY CHECK: Are they logged in?
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    // If not logged in, kick them out immediately!
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    fetch(`https://eventify-api-zm3d.onrender.com/api/tickets/dashboard/${id}/`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Could not load dashboard.");
        return response.json();
      })
      .then(dashboardData => {
        setData(dashboardData);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id, isAuthenticated, navigate]);

  // 🚀 NEW: The CSV Export Function
  const downloadCSV = () => {
    if (!data || data.recent_sales.length === 0) return;
    
    // Create the CSV headers
    const headers = ["Ticket ID,Buyer Name,Email,Purchase Date,Status"];
    
    // Map the data into CSV rows
    const rows = data.recent_sales.map(t => 
      `${t.ticket_id},"${t.buyer}","${t.email}","${t.date}",${t.is_scanned ? "Checked In" : "Pending"}`
    );
    
    // Combine and trigger the download
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${data.event_title.replace(/\s+/g, '_')}_GuestList.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <div style={{ textAlign: "center", padding: "60px", color: "#EF4444" }}>{error}</div>;

  // Calculate Check-in Percentage
  const checkInRate = data.total_sold > 0 
    ? Math.round((data.scanned_count / data.total_sold) * 100) 
    : 0;

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", padding: "40px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* HEADER & NAVIGATION (Updated with Manage button) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ color: "#64748B", margin: "0 0 4px 0", fontWeight: "600", textTransform: "uppercase", fontSize: "0.85rem" }}>Organizer Dashboard</p>
            <h1 style={{ color: "#0F172A", margin: 0, fontSize: "2rem", fontWeight: "800" }}>{data.event_title}</h1>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to={`/manage/${id}`} style={{ padding: "12px 24px", backgroundColor: "#0F172A", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "600", display: "flex", gap: "8px", alignItems: "center" }}>
               Manage Event
            </Link>
            <Link to="/scan" style={{ padding: "12px 24px", backgroundColor: "#10B981", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "600", display: "flex", gap: "8px", alignItems: "center" }}>
                Open Scanner
            </Link>
          </div>
        </div>

        {/* ORGANIZER FEATURE GUIDE */}
        <div style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "20px", marginBottom: "32px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{ fontSize: "1.5rem" }}></div>
          <div>
            <h3 style={{ margin: "0 0 8px 0", color: "#1E3A8A", fontSize: "1.1rem" }}>Welcome to your Command Center</h3>
            <p style={{ margin: 0, color: "#2563EB", fontSize: "0.95rem", lineHeight: 1.5 }}>
              Here you can track your live revenue and monitor door check-ins in real-time. Use the <strong>Manage Event</strong> button to send email updates, or the <strong>Open Scanner</strong> button on your phone to check students in at the gate!
            </p>
          </div>
        </div>

        {/* THE 3 STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <p style={{ margin: "0 0 8px 0", color: "#64748B", fontWeight: "600" }}>Total Tickets Sold</p>
            <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "800", color: "#0F172A" }}>{data.total_sold}</p>
          </div>

          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <p style={{ margin: "0 0 8px 0", color: "#64748B", fontWeight: "600" }}>Total Revenue</p>
            <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "800", color: "#10B981" }}>KES {data.total_revenue.toLocaleString()}</p>
          </div>

          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <p style={{ margin: 0, color: "#64748B", fontWeight: "600" }}>Checked In</p>
              <span style={{ color: "#10B981", fontWeight: "700", backgroundColor: "#D1FAE5", padding: "2px 8px", borderRadius: "12px", fontSize: "0.85rem" }}>{checkInRate}%</span>
            </div>
            <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: "800", color: "#0F172A" }}>{data.scanned_count} <span style={{ fontSize: "1.2rem", color: "#94A3B8", fontWeight: "600" }}>/ {data.total_sold}</span></p>
            
            {/* Progress Bar */}
            <div style={{ width: "100%", height: "8px", backgroundColor: "#E2E8F0", borderRadius: "4px", marginTop: "16px", overflow: "hidden" }}>
              <div style={{ width: `${checkInRate}%`, height: "100%", backgroundColor: "#10B981", transition: "width 0.5s ease" }}></div>
            </div>
          </div>

        </div>

        {/* GUEST LIST TABLE WITH CSV EXPORT */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "24px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#0F172A", fontWeight: "700" }}>Guest List</h2>
            <button 
              onClick={downloadCSV}
              style={{ padding: "8px 16px", backgroundColor: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px" }}
            >
              Download CSV
            </button>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ backgroundColor: "#F8FAFC", color: "#475569", fontSize: "0.85rem", textTransform: "uppercase" }}>
                <tr>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Ticket ID</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Buyer</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Purchase Date</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_sales.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "#94A3B8" }}>No tickets sold yet. Start sharing your event!</td>
                  </tr>
                ) : (
                  data.recent_sales.map((ticket, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "16px 24px", fontFamily: "monospace", color: "#475569", fontWeight: "600" }}>{ticket.ticket_id}</td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ fontWeight: "600", color: "#0F172A" }}>{ticket.buyer}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{ticket.email}</div>
                      </td>
                      <td style={{ padding: "16px 24px", color: "#64748B", fontSize: "0.9rem" }}>{ticket.date}</td>
                      <td style={{ padding: "16px 24px" }}>
                        {ticket.is_scanned ? (
                          <span style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "600" }}>Checked In</span>
                        ) : (
                          <span style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "600" }}>Pending</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
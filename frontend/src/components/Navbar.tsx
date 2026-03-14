export default function Navbar() {
  return (
    <nav style={{
      background:"#0F172A",
      color:"white",
      padding:"16px 32px",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
    }}>
      <h2 style={{color:"#14B8A6"}}>Eventify</h2>

      <div style={{display:"flex", gap:"20px"}}>
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/dashboard">Host</a>
      </div>
    </nav>
  )
}
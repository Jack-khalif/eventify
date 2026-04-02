import { useState } from "react";
//import { useNavigate } from "react-router-dom";

export default function Auth() {
  //const navigate = useNavigate();
  
  // Toggle between Login and Signup modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Determine which Django endpoint to hit
    const endpoint = isLogin ? "/api/users/login/" : "/api/users/signup/";
    
    // DRF's built-in login only wants username and password. 
    // Our custom signup wants email too.
    const payload = isLogin 
      ? { username, password } 
      : { username, email, password };

    try {
      const response = await fetch(`https://eventify-api-zm3d.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // 🚀 THE MAGIC HAPPENS HERE: Save the token to the browser!
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", isLogin ? username : data.username);
        
        alert(isLogin ? "Welcome back!" : "Account created successfully!");
        
        // Force a hard reload to update the Navbar state, then go home
        window.location.href = "/"; 
      } else {
        // Handle Django's error messages (could be an object or an array)
        const errorMsg = data.non_field_errors || data.error || data.username || "Authentication failed.";
        setError(String(errorMsg));
      }
    } catch (err) {
      setError("Network error. Is your Django server running?");
    }
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "400px", backgroundColor: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0F172A", margin: "0 0 8px 0" }}>
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p style={{ color: "#64748B", margin: 0 }}>
            {isLogin ? "Enter your details to access your tickets." : "Sign up to start discovering campus events."}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: "#FEE2E2", color: "#991B1B", padding: "12px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Username</label>
            <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
          </div>

          {!isLogin && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "1rem" }} />
          </div>

          <button type="submit" style={{ padding: "14px", backgroundColor: "#14B8A6", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer", marginTop: "8px" }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            style={{ background: "none", border: "none", color: "#14B8A6", fontWeight: "600", cursor: "pointer", fontSize: "0.95rem" }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

      </div>
    </div>
  );
}
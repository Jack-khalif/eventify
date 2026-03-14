export default function Hero(){
  return(

    <section style={{
      background:"#0F172A",
      color:"white",
      padding:"100px 20px"
    }}>

      <div className="container">

        <h1 style={{
          fontSize:"48px",
          marginBottom:"20px"
        }}>
          Discover Amazing Events
        </h1>

        <p style={{
          fontSize:"20px",
          opacity:0.8,
          marginBottom:"30px"
        }}>
          Concerts, tech conferences, festivals and workshops near you.
        </p>

        <input
          placeholder="Search events..."
          style={{
            padding:"14px",
            width:"300px",
            borderRadius:"8px",
            border:"none",
            marginRight:"10px"
          }}
        />

        <button
          style={{
            background:"#14B8A6",
            border:"none",
            padding:"14px 20px",
            borderRadius:"8px",
            color:"white",
            fontWeight:"bold",
            cursor:"pointer"
          }}
        >
          Search
        </button>
        <img
         src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
         style={{
             width:"100%",
             borderRadius:"12px",
             marginTop:"40px"
                }}
/>

      </div>

    </section>
  )
}
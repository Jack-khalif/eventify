export default function EventDetails(){

  return(

    <div style={{padding:"40px"}}>

      <h1>AI & Machine Learning Bootcamp</h1>

      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        style={{
          width:"100%",
          maxWidth:"900px",
          borderRadius:"12px",
          marginTop:"20px"
        }}
      />

      <p style={{marginTop:"20px"}}>
        Join us for a hands-on workshop introducing machine learning,
        AI tools and modern data science workflows.
      </p>

      <h3 style={{marginTop:"20px"}}>Date</h3>
      <p>June 12</p>

      <h3>Location</h3>
      <p>Nairobi</p>

      <button
        style={{
          marginTop:"20px",
          background:"#14B8A6",
          border:"none",
          padding:"14px 24px",
          borderRadius:"8px",
          color:"white",
          fontWeight:"bold",
          cursor:"pointer"
        }}
      >
        Buy Ticket
      </button>

    </div>

  )

}
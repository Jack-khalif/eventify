
import { useParams, Link } from "react-router-dom";   // add Link import
export default function EventDetails(){

  const { id } = useParams()

  return(

    <div style={{padding:"40px"}}>

      <h1>Event: {id}</h1>

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
        Event description will appear here.
      </p>

      
      <Link
         to={`/checkout/${id}`}
            style={{
                marginTop: "20px",
                background: "#14B8A6",
                border: "none",
                padding: "14px 24px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-block",
                textDecoration: "none"
            }}
            >
            Buy Ticket
      </Link>
      

    </div>

  )

}
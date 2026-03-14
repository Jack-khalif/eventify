type EventCardProps = {
  title: string
  date: string
  location: string
  price: string
  image: string
}

export default function EventCard(props: EventCardProps){

  return(
    <div style={{
      background:"white",
      borderRadius:"12px",
      overflow:"hidden",
      boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
    }}>

      <img
        src={props.image}
        style={{
          width:"100%",
          height:"200px",
          objectFit:"cover"
        }}
      />

      <div style={{padding:"16px"}}>

        <h3 style={{marginBottom:"8px"}}>
          {props.title}
        </h3>

        <p style={{opacity:0.7,fontSize:"14px"}}>
          {props.date}
        </p>

        <p style={{opacity:0.7,fontSize:"14px"}}>
          {props.location}
        </p>

        <p style={{
          color:"#14B8A6",
          fontWeight:"bold",
          marginTop:"10px"
        }}>
          From {props.price}
        </p>

      </div>

    </div>
  )
}
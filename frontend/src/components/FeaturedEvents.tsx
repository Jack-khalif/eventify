import EventCard from "./EventCard"
import { events } from "../data/events"

export default function FeaturedEvents(){

  return(

    <section className="container">

      <h2 style={{marginBottom:"30px"}}>
        Featured Events
      </h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(250px,1fr))",
        gap:"20px"
      }}>

        {events.map((event) => (

          <EventCard
            key={event.id}
             id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            image={event.image}
          />

        ))}

      </div>

    </section>

  )

}
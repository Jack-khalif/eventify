import EventCard from "./EventCard"

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

        <EventCard
          title="AI & Machine Learning Bootcamp"
          date="June 12"
          location="Nairobi"
          price="KSh 500"
          image="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        />

        <EventCard
          title="Startup Networking Night"
          date="July 5"
          location="Westlands"
          price="KSh 800"
          image="https://images.unsplash.com/photo-1511578314322-379afb476865"
        />

        <EventCard
          title="Music Festival"
          date="Aug 18"
          location="Ngong Hills"
          price="KSh 1500"
          image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        />

        <EventCard
          title="Data Science Workshop"
          date="June 22"
          location="Kenyatta University"
          price="KSh 400"
          image="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
        />

      </div>

    </section>

  )
}
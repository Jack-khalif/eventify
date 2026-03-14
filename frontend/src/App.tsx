import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Events from "./pages/Events";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";

// We will add more pages here soon (Events, Dashboard, etc.)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages go inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          {/* Future pages will be added here */}
          {/* <Route path="/events" element={<Events />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
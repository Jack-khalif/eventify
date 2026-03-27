import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Events from "./pages/Events";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ScrollToTop from "./components/ScrollToTop";


import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";

// We will add more pages here soon (Events, Dashboard, etc.) 
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* All pages go inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          
        
          <Route path="/confirmation/:id" element={<Confirmation />} />
          {/* Future pages will be added here */}
          {/* <Route path="/events" element={<Events />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
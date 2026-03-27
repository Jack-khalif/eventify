import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the pathname changes, instantly snap to the top left of the window
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component renders absolutely nothing to the screen!
}
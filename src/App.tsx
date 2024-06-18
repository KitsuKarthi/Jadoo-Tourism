import {Routes, Route, useLocation } from "react-router-dom";
//importing react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animateScroll } from "react-scroll";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import { useEffect } from "react";
import SignUp from "./components/pages/SignUp";
import BookingTour from "./components/pages/BookingTour";
import NavBar from "./components/organs/NavBar";
import { AuthProvider } from '../src/components/organs/AuthContext';
import BookingDetails from "./components/pages/BookingDetails";
import UpdateBookingDetails from "./components/pages/UpdateBookingDetails";
import { UserDetailsProvider } from "./components/organs/UserDetailsContext";
import Destination from "./components/pages/Destination";

function App() {
  const directory = useLocation();
  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  return (
    <div className="w-full bg-white text-gray-950 font-poppins">
      <AuthProvider>
        <UserDetailsProvider>
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/BookingTour" element={<BookingTour />} />
              <Route path="/BookingDetails" element={<BookingDetails />} />
              <Route path="/UpdateBookingDetails" element={<UpdateBookingDetails />} />
              <Route path="/Destination" element={<Destination />} />
            </Routes>
        </UserDetailsProvider>
      </AuthProvider>
    </div>
  )
}

export default App

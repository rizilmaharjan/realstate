import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
export default function MainLayout() {
  const location = useLocation();
  console.log("this is location", location);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow">
          <Outlet />
        </div>

        {location.pathname !== "/sign-in" && <Footer />}
      </div>
    </>
  );
}

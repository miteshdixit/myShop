import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  const location = useLocation();
  const hideNavbarAndFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarAndFooter && (
        <Navbar className="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />
      )}

      <main className={`flex-grow ${!hideNavbarAndFooter ? "mt-[70px]" : ""}`}>
        <Outlet />
      </main>

      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../components";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

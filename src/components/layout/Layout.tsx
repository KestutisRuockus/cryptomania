import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FilterBar from "./FilterBar";

const Layout = () => {
  return (
    <>
      <Header />
      <FilterBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

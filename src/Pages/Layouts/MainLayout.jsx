import { Outlet } from "react-router-dom";

import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";

export const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

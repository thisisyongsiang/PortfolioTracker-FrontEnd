import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Components/Header"; // import header object
import Banner from "./Components/Banner";
import PortfolioCharts from "./Components/PortfolioCharts";

const Layout = () => {
  return (
    <>
        < Header />
        < Banner />
        < PortfolioCharts />
        < Outlet />
    </>
  );
};

export default Layout;
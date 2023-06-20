import { Outlet,useLocation } from "react-router-dom";

import Header from "./header/Header";

const PageWrapper = () => {

  return (
    <div className="page-wrapper">
      <div className="bg-noise-container"></div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PageWrapper;

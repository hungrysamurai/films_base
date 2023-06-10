import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <div>
      <p>page wrapper</p>
      <Outlet />
    </div>
  );
};

export default PageWrapper;

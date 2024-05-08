import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import MediaTypeLinks from "./MediaTypeLinks";
import SearchBox from "./SearchBox";
import HeaderIconsContainer from "./HeaderIconsContainer";
import Title from "./Title";
import getBaseURL from "../../utils/getBaseURL";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="header-container">
      <Logo />
      {/* If Homepage - display media type links */}
      {pathname === getBaseURL() ? <MediaTypeLinks /> : <Title />}
      <SearchBox />
      <HeaderIconsContainer />
    </header>
  );
};

export default Header;

import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import MediaTypeLinks from "./MediaTypeLinks";
import SearchBox from "./SearchBox";
import HeaderIconsContainer from "./HeaderIconsContainer";
import Title from "./Title";
import getBaseURL from "../../utils/getBaseURL";
import { MediaType } from "../../types";

type HeaderProps = {
  setCurrentMediaType: React.Dispatch<React.SetStateAction<MediaType>>;
};

const Header: React.FC<HeaderProps> = ({ setCurrentMediaType }) => {
  const { pathname } = useLocation();

  return (
    <header className="header-container">
      <Logo />
      {/* If Homepage - display media type links */}
      {pathname === getBaseURL() ? (
        <MediaTypeLinks setCurrentMediaType={setCurrentMediaType} />
      ) : (
        <Title />
      )}
      <SearchBox />
      <HeaderIconsContainer />
    </header>
  );
};

export default Header;

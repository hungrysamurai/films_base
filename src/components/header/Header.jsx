import Logo from "./Logo";
import MediaTypeLinks from "./MediaTypeLinks";
import SearchBox from "./SearchBox";
import HeaderIconsContainer from "./HeaderIconsContainer";
import Title from "./Title";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useLocation } from "react-router-dom";


const Header = () => {
const {baseName} = useGlobalContext();
const {pathname} = useLocation();

  return (
    <header className="header-container">
      <Logo />
      {pathname === baseName ? <MediaTypeLinks/> : <Title />}
      <SearchBox/>
      <HeaderIconsContainer/>
    </header>
  );
};

export default Header;

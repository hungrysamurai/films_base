import Logo from "./Logo";
import ContentTypeLinks from "./ContentTypeLinks";
import SearchBox from "./SearchBox";
import HeaderIconsContainer from "./HeaderIconsContainer";
import Title from "./Title";

import { useLocation } from "react-router-dom";

const Header = () => {

const {pathname} = useLocation();

  return (
    <header className="header-container">
      <Logo />

      {pathname === '/' ? <ContentTypeLinks/> : <Title />}
  
      <SearchBox/>
      <HeaderIconsContainer/>
    </header>
  );
};

export default Header;

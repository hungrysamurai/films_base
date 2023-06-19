import Logo from "./Logo";
import ContentTypeLinks from "./ContentTypeLinks";
import SearchBox from "./SearchBox";
import HeaderIconsContainer from "./HeaderIconsContainer";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Header = () => {



  return (
    <header className="header-container">
      <Logo />
      <ContentTypeLinks/>
      <SearchBox/>
      <HeaderIconsContainer/>


    </header>
  );
};

export default Header;

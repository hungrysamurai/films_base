import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Title = () => {
  const { currentTitle } = useGlobalContext();

  return (
    <div className="title-container">
      <h2 className="title-heading">{currentTitle}</h2>
    </div>
  );
};

export default Title;

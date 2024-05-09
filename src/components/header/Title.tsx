import { useAppSelector } from "../../store/hooks";
import { getCurrentMainTitle } from "../../store/slices/mainSlice";

const Title: React.FC = () => {
  const currentTitle = useAppSelector(getCurrentMainTitle);
  return (
    <div className="title-container">
      <h2 className="title-heading">{currentTitle}</h2>
    </div>
  );
};

export default Title;

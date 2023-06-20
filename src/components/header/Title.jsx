import { useLocation } from "react-router-dom";

const Title = () => {
 const {pathname} = useLocation();

 return <div className="title-container">
  <h2 className="title-heading">This is undbelievable long sample heading</h2>
  </div>
}

export default Title;
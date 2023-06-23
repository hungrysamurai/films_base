import { useGlobalContext } from "../../contexts/GlobalContext";

const HeaderIconsContainer = () => {
  const {theme,setTheme, lang, dispatch} = useGlobalContext();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const toggleLang = () => {
   if(lang === 'ru'){
    dispatch({type: 'SET_LANG', payload: 'en'})
   } else {
    dispatch({type: 'SET_LANG', payload: 'ru'})
   }
  }

 return (
        <div className="header-icons-container">

        <a href="#">
          <img src={`./assets/images/icons/icon-user-${theme}.svg`} alt="user-profile" />
        </a>

        <a href="#" onClick={toggleTheme}>
          <img
            src={`./assets/images/icons/icon-theme-${theme}.svg`}
            alt="switch-theme"
          />
        </a>

        <a href="#" onClick={toggleLang}>
          <img
            src={`./assets/images/icons/icon-lang-${lang}-${theme}.svg`}
            alt="language"
          />
        </a>

      </div>
 )
}

export default HeaderIconsContainer
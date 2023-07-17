export const getLang = () => {
  const stored = localStorage.getItem("FBlang");
  if (stored) {
    return stored;
  }
  const navigatorLang = navigator.language.split("-")[0];
  if (navigatorLang === "ru") return "ru";
  else return "en";
};

import { Lang } from "../types";

export const getLang = (): Lang => {
  const stored = localStorage.getItem("FBlang") as Lang;
  if (stored) {
    return stored;
  }
  const navigatorLang = navigator.language.split("-")[0];
  if (navigatorLang === Lang.Ru) return Lang.Ru;
  else return Lang.En;
};

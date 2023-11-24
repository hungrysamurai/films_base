import { ColorTheme } from '../types'

export const getTheme = (): ColorTheme => {
 return localStorage.getItem("theme") as ColorTheme || ColorTheme.Dark;
};

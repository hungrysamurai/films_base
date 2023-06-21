export const getBaseName = () =>
 import.meta.env.DEV
  ?
  import.meta.env.VITE_DEV_BASE_NAME
  :
  import.meta.env.VITE_PROD_BASE_NAME;
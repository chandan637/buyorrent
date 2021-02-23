export const IS_PROD = process.env.NODE_ENV === 'production';
export const API_URL = IS_PROD ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
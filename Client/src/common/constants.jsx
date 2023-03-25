// export const SERVER_LINK = "http://192.168.29.34:1322/api/"; //for wifi
// export const SERVER_LINK = "http://172.16.141.207:1322/api/"; //for BVM wifi
// export const SERVER_LINK = "http://192.168.43.230:1322/api/"; //for mobile Hotspot
// export const SERVER_LINK = "https://dashing-otter-62d612.netlify.app/api/"; //for Backend
export const SERVER_LINK = import.meta.env.VITE_SERVER_LINK;

export const JWT_SEC_KEY = import.meta.env.VITE_JWT_SEC_KEY;

// const ROLES = {
//   User: 2002,
//   Teacher: 2017,
//   Admin: 5150,
// };

import { parseCookies, setCookie } from "nookies";

const getMyCookies = (key: string): string => {
  const cookies = parseCookies();

  return cookies[key];
};

const setMyCookies = (key: string, value: string) => {
  setCookie(null, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export { getMyCookies, setMyCookies };

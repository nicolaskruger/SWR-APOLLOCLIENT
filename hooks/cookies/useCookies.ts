import { useState } from "react";
import { getMyCookies, setMyCookies } from "./helper";

const useCookies = (key: string): [string, (value: string) => void] => {
  const [cookies, setCookies] = useState(getMyCookies(key));

  const set = (value: string) => {
    setMyCookies(key, value);
    setCookies(value);
  };

  return [cookies, set];
};

export { useCookies };

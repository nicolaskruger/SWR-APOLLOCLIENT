import { useCookies } from "../cookies/useCookies";

const useToken = (): [string, (value: string) => void] => {
  return useCookies("@token");
};

export { useToken };

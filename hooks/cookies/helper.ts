const getMyCookies = (key: string): string => {
  return "not a cookie";
};

const setMyCookies = (key: string, value: string) => {
  throw new Error("not implemented");
};

export { getMyCookies, setMyCookies };

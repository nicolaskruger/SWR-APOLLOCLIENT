import { useState } from "react";

const useCookies = (key: string): [string, (value: string) => void] => {
  return useState("");
};

export { useCookies };

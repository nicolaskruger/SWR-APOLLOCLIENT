import { useRouter } from "next/navigation";
import { useMe } from "../me/useMe";
import { useEffect } from "react";

const useRedirectIfNotLogged = () => {
  const { error } = useMe();

  const { push } = useRouter();

  useEffect(() => {
    if (error) push("/swr/login");
  }, [error]);
};

export { useRedirectIfNotLogged };

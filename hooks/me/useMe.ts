import useSwr from "swr";
import { useToken } from "../token/useToken";
import axios, { AxiosError } from "axios";

const useMe = () => {
  const [token] = useToken();
  const props = useSwr<User, AxiosError<{ msg: string }>, [string, string]>(
    ["/api/swr/me", token],
    async ([url, token]) => {
      const response = await axios.get<User>(url, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    }
  );
  return props;
};

export { useMe };

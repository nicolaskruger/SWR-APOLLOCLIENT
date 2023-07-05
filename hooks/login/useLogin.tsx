import axios from "axios";
import useSWRMutation from "swr/mutation";

export type LoginProps = {
  email: string;
  password: string;
};

const login = async (url: string, { arg }: { arg: LoginProps }) => {
  return (await axios.get<{ token: string }>(url, { params: arg })).data;
};

const useLogin = () => {
  return useSWRMutation("/api/swr/user/login", login);
};

export { useLogin };

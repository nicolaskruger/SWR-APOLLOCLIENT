import axios from "axios";
import useSwr from "swr";

type UseUserReturn = {
  user: User;
  isLoading: boolean;
  isError: boolean;
};

const useUser = (id: string): UseUserReturn => {
  const { data, error, isLoading } = useSwr(
    `/api/user/${id}`,
    async (url: string) => {
      const user = (await axios.get<User>(url)).data;
      return user;
    }
  );

  return {
    user: data!,
    isError: error,
    isLoading,
  };
};

export { useUser };

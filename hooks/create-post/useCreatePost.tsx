import axios, { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";

type Args = { text: string; token: string };

const createPost = async (url: string, { arg }: { arg: Args }) => {
  return (
    await axios.post<{ msg: string }>(
      url,
      { text: arg.text },
      { headers: { authorization: arg.token } }
    )
  ).data;
};

const useCreatePost = () => {
  return useSWRMutation<
    { msg: string },
    AxiosError<{ msg: string }>,
    "/api/swr/post",
    Args
  >("/api/swr/post", createPost);
};

export { useCreatePost };

import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useToken } from "../token/useToken";

const useGetPostInfinite = () => {
  const [token] = useToken();
  const props = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return { url: "/api/swr/post", page: pageIndex };
    },
    async ({ url, page }) => {
      const response = await axios.get<PostAllInfo[]>(url, {
        params: { limit: 3, page },
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    }
  );

  return props;
};

export { useGetPostInfinite };

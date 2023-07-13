import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useToken } from "../token/useToken";

const PAGE_SIZE = 3;

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

  const concatData = props.data
    ? props.data.reduce((acc, curr) => [...acc, ...curr], [])
    : [];
  const isLoadingMore =
    props.isLoading ||
    (props.size > 0 &&
      props.data &&
      typeof props.data[props.size - 1] === "undefined");
  const isEmpty = props.data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (props.data && props.data[props.data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing =
    props.isValidating && props.data && props.data.length === props.size;

  return {
    ...props,
    concatData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
  };
};

export { useGetPostInfinite };

import { useLazyQuery, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";

export type PostType = { post: { text: string; id: string }[] };

export const GET_POST = gql`
  query PostQuery($page: Int, $limit: Int) {
    post(page: $page, limit: $limit) {
      text
      id
    }
  }
`;

const useLoadPostGql = () => {
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(0);

  const [get, { loading, data, fetchMore, refetch }] = useLazyQuery<PostType>(
    GET_POST,
    {
      variables: {
        page,
        limit: 3,
      },
    }
  );

  const fetch = async () => {
    await get({
      variables: {
        page,
        limit: 3,
      },
    });
  };

  const loadMore = async () => {
    const data = await fetchMore<PostType>({
      variables: {
        page: page + 1,
      },
    });

    if (data.data.post.length < 3) setLastPage(true);

    setPage(page + 1);
  };

  return {
    loading,
    data: data as PostType,
    loadMore,
    refetch,
    lastPage,
    fetch,
  };
};

export { useLoadPostGql };

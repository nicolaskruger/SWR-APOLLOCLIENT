import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";

export type PostType = { post: { text: string; id: string }[] };

const QUERY = gql`
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

  const { loading, data, fetchMore, refetch } = useQuery<PostType>(QUERY, {
    variables: {
      page,
      limit: 3,
    },
  });

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
  };
};

export { useLoadPostGql };

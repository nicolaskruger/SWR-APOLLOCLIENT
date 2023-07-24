import { useEffect } from "react";
import { useLoadPostGql } from "../../hooks/load-post-gql/useLoadPostGql";
import { Spinner } from "../spinner/spinner";

const PostGql = () => {
  const { data, loadMore, loading, lastPage, fetch } = useLoadPostGql();

  useEffect(() => {
    fetch();
  }, []);

  if (loading || !data) return <Spinner />;

  return (
    <div>
      <ul>
        {data.post.map(({ id, text }) => (
          <li data-testid="li-post-info" key={id}>
            {text}
          </li>
        ))}
      </ul>
      {!lastPage && (
        <button
          data-testid="button-post-gql"
          onClick={() => {
            loadMore();
          }}
        >
          load more
        </button>
      )}
    </div>
  );
};

export { PostGql };

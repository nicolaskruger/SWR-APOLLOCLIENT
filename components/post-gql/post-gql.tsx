import { useLoadPostGql } from "../../hooks/load-post-gql/useLoadPostGql";
import { Spinner } from "../spinner/spinner";

const PostGql = () => {
  const { data, loadMore, loading, lastPage } = useLoadPostGql();

  if (loading) return <Spinner />;

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

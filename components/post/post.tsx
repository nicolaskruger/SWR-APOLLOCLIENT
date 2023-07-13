import { useGetPostInfinite } from "../../hooks/get-post-infinite/useGetPostInfinit";
import { Spinner } from "../spinner/spinner";

const Post = () => {
  const { isLoading, concatData, setSize, size, isReachingEnd } =
    useGetPostInfinite();

  const posts = concatData.map(({ date, text, user, id }) => (
    <div key={id}>
      <p>{user.name}</p>
      <p>{date}</p>
      <p>{text}</p>
    </div>
  ));

  return (
    <div>
      {posts}
      <button
        data-testid="button-post-load-more"
        onClick={() => setSize(size + 1)}
        disabled={isReachingEnd}
      >
        load more
      </button>
      {isLoading && <Spinner />}
    </div>
  );
};

export { Post };

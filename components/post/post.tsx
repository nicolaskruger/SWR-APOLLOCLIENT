import { useGetPostInfinite } from "../../hooks/get-post-infinite/useGetPostInfinit";
import { Spinner } from "../spinner/spinner";

const Post = () => {
  const { isLoading, concatData, setSize, size, isReachingEnd } =
    useGetPostInfinite();

  const posts = concatData.map(({ date, text, user, id }) => (
    <div className="mt-4 flex flex-col space-y-2" key={id}>
      <div>
        <img src="" alt="" />
        <p>{user.name}</p>
      </div>
      <p>{text}</p>
      <p>{date}</p>
    </div>
  ));

  return (
    <div>
      {posts}
      <button
        className="bg-slate-700 py-2 px-5 disabled:invisible"
        data-testid="button-post-load-more"
        onClick={() => {
          setSize(size + 1);
        }}
        disabled={isReachingEnd}
      >
        load more
      </button>
      {isLoading && <Spinner />}
    </div>
  );
};

export { Post };

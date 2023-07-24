import { FormEvent, useState } from "react";
import { useNewPostGql } from "../../hooks/new-post-gql/useNewPostGql";
import { Spinner } from "../spinner/spinner";
import { useLoadPostGql } from "../../hooks/load-post-gql/useLoadPostGql";

const NewPostGql = () => {
  const { addPost, loading, error } = useNewPostGql();

  const { refetch } = useLoadPostGql();
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await addPost(text);
    await refetch();
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          className="text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          id="text"
          data-testid="input-text-new-post-gql"
        />
        <button type="submit" data-testid="button-text-new-post-gql">
          post
        </button>
      </form>
      {loading && <Spinner />}
      {error && <p data-testid="p-error-new-post-gql">{error.message}</p>}
    </div>
  );
};

export { NewPostGql };

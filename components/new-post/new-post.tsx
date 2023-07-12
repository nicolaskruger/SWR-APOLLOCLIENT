import { FormEvent, useState } from "react";
import { useCreatePost } from "../../hooks/create-post/useCreatePost";
import { Spinner } from "../spinner/spinner";
import { PError } from "../p-error/p-error";
import { useToken } from "../../hooks/token/useToken";

const NewPost = () => {
  const { error, isMutating, trigger } = useCreatePost();

  const [token] = useToken();

  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!text) {
      return;
    }

    await trigger({
      text,
      token,
    });

    setText("");
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="input-new-post"
        name="post"
        id="post"
      />
      <button data-testid="button-new-post">post</button>
      <PError data-testid="p-new-post-error" isError={Boolean(error)}>
        {error?.response?.data.msg}
      </PError>
      {isMutating && <Spinner />}
    </form>
  );
};

export { NewPost };

import { useNewPostGql } from "../../hooks/new-post-gql/useNewPostGql";

const NewPostGql = () => {
  const { addPost, loading, error } = useNewPostGql();

  return <div></div>;
};

export { NewPostGql };

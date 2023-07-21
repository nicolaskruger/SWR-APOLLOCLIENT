import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useToken } from "../token/useToken";

const MUTATION = gql`
  mutation NewPost($token: String, $text: String) {
    newPost(token: $token, text: $text)
  }
`;

const useNewPostGql = () => {
  const [token] = useToken();

  const [_addPost, { ...props }] = useMutation<{ token: string; text: string }>(
    MUTATION
  );

  const addPost = async (text: string) => {
    await _addPost({ variables: { token, text } });
  };

  return { addPost, ...props };
};

export { useNewPostGql };

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useToken } from "../token/useToken";
import { GET_POST } from "../load-post-gql/useLoadPostGql";

const MUTATION = gql`
  mutation NewPost($token: String, $text: String) {
    newPost(token: $token, text: $text)
  }
`;

const useNewPostGql = () => {
  const [token] = useToken();

  const [_addPost, { ...props }] = useMutation<{ token: string; text: string }>(
    MUTATION,
    {
      refetchQueries: [GET_POST],
    }
  );

  const addPost = async (text: string) => {
    await _addPost({ variables: { token, text } });
  };

  return { addPost, ...props };
};

export { useNewPostGql };

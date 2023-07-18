import { gql, useLazyQuery } from "@apollo/client";
import { useToken } from "../token/useToken";

const LOGIN = gql`
  query ExampleQuery($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const useLoginGql = () => {
  const [getLogin, { ...props }] = useLazyQuery(LOGIN);

  const [, setToken] = useToken();

  const login = async (email: string, password: string) => {
    const token = await getLogin({
      variables: { email, password },
    });

    setToken(token.data.token);
  };

  return {
    login,
    ...props,
  };
};

export { useLoginGql };

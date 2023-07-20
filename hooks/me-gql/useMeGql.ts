import { gql, useQuery } from "@apollo/client";
import { useToken } from "../token/useToken";

const QUERY = gql`
  query Me($token: String) {
    me(token: $token) {
      name
      email
      password
      id
      url
    }
  }
`;

const useMeGql = () => {
  const [token] = useToken();

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      token: token,
    },
  });

  const dataType = data as { me: User };

  return {
    data: dataType,
    loading,
    error,
  };
};

export { useMeGql };

import { useMeGql } from "../../hooks/me-gql/useMeGql";

const MeGql = () => {
  const { data, error, loading } = useMeGql();

  if (loading) return <p data-testid="p-loading-me">...loading</p>;

  if (error) return <p data-testid="p-error-me">{error.message}</p>;

  const { email, name } = data.me;

  return (
    <ul>
      <li>
        <p data-testid="p-email-me">{email}</p>
      </li>
      <li>
        <p data-testid="p-name-me">{name}</p>
      </li>
    </ul>
  );
};

export { MeGql };

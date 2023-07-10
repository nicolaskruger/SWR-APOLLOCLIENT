import { useMe } from "../../hooks/me/useMe";
import { Spinner } from "../spinner/spinner";

const Me = () => {
  const { data, error, isLoading } = useMe();

  if (error) return <p data-testid="p-error-me">{error.response?.data.msg}</p>;

  if (isLoading) return <Spinner />;

  if (!data) return <Spinner />;

  const { email, name, url } = data;

  return (
    <div>
      <img data-testid="img-me" src={url} alt="no img" />

      <div>
        <p data-testid="p-me-name">{name}</p>
        <p data-testid="p-me-email">{email}</p>
      </div>
    </div>
  );
};

export { Me };

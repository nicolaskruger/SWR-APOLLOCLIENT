import axios from "axios";
import Link from "next/link";
import useSwr from "swr";

type User = {
  name: string;
  email: string;
  id: string;
  password: string;
};

const UserPage = () => {
  const { data, error, isLoading } = useSwr(
    "/api/user",
    async (url: string) => {
      return (await axios.get<{ user: User[] }>(url)).data.user;
    }
  );

  if (error) return <p data-testid="p-error-message">can&apos;t fetch</p>;

  if (isLoading) return <p data-testid="p-loading">loading...</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li data-testid="li-user" key={user.id}>
          <p>name: {user.name}</p>
          <Link href={`/user/${user.id}`}>link</Link>
        </li>
      ))}
    </ul>
  );
};

export { UserPage };

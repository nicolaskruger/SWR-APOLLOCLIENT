"use client";

import { useUser } from "../../../../hooks/user/useUser";

const Page = ({ params }: { params: { id: string } }) => {
  const { isError, isLoading, user } = useUser(params.id);

  if (isError) return <p data-testid="p-error">error</p>;

  if (isLoading) return <p data-testid="p-loading">loading...</p>;

  return <div data-testid="div-user">user: {user.name}</div>;
};

export default Page;

import useSwr from "swr";

const UserPage = () => {
  const { data, error, isLoading } = useSwr("", () => {});

  return <div></div>;
};

export { UserPage };

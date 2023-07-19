import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

type Props = {
  children: React.ReactNode;
};

const MyApolloClient = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: "/api/apollo",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { MyApolloClient };

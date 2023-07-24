import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

type Props = {
  children: React.ReactNode;
};

const MyApolloClient = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: "/api/apollo",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            post: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: false,

              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { MyApolloClient };

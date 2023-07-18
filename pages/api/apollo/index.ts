import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { loginRepository } from "../../utils/login/login-repository";

const resolvers = {
  Query: {
    login: (
      value: string,
      { email, password }: { email: string; password: string }
    ) => loginRepository.login(email, password),
  },
};

const typeDefs = gql`
  type Token {
    token: String
  }
  type Query {
    login(email: String, password: String): Token
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

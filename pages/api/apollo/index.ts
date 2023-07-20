import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { loginRepository } from "../../utils/login/login-repository";
import { meRepository } from "../../utils/me/me-repository";

const resolvers = {
  Query: {
    login: (
      value: string,
      { email, password }: { email: string; password: string }
    ) => loginRepository.login(email, password),
    me: (_: any, { token }: { token: string }) =>
      meRepository.decodeToken(token),
  },
};

const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
    id: String
    url: String!
  }
  type Token {
    token: String
  }
  type Query {
    login(email: String, password: String): Token
    me(token: String): User
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

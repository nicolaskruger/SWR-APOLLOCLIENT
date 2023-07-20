import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { loginRepository } from "../../utils/login/login-repository";
import { meRepository } from "../../utils/me/me-repository";
import { postRepository } from "../../utils/post/post-repository";

const resolvers = {
  Query: {
    login: (
      value: string,
      { email, password }: { email: string; password: string }
    ) => loginRepository.login(email, password),
    me: (_: any, { token }: { token: string }) =>
      meRepository.decodeToken(token),
  },
  Mutation: {
    newPost: (_: any, { text, token }: { token: string; text: string }) => {
      const user = meRepository.decodeToken(token);

      postRepository.addPost({
        date: new Date().toISOString(),
        id: `${Math.random()}`,
        text,
        userId: user.id,
      });
    },
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
  type Mutation {
    newPost(token: String, text: String): Boolean
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

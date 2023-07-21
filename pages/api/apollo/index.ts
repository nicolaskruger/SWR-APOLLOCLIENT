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
    post: (_: any, { page, limit }: { page: number; limit: number }) =>
      postRepository.getPaginatedPost(page, limit),
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
  type UserPost {
    id: String
    name: String
    email: String
    url: String
  }
  type PostAllInfo {
    id: String
    user: UserPost
    text: String
    date: String
  }
  type Token {
    token: String
  }
  type Query {
    login(email: String, password: String): Token
    me(token: String): User
    post(page: Int, limit: Int): [PostAllInfo]
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

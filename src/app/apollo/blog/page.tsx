"use client";
import { Blog } from "../../../../components/blog/blog";
import { MyApolloClient } from "../../../../components/my-apollo-client/my-apollo-client";
import { NewPostGql } from "../../../../components/new-post-gql/new-post-gql";
import { PostGql } from "../../../../components/post-gql/post-gql";

const Page = () => {
  return (
    <MyApolloClient>
      <Blog />
      <NewPostGql />
      <PostGql />
    </MyApolloClient>
  );
};

export default Page;

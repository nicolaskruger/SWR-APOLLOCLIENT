"use client";
import { Blog } from "../../../../components/blog/blog";
import { MyApolloClient } from "../../../../components/my-apollo-client/my-apollo-client";
import { NewPostGql } from "../../../../components/new-post-gql/new-post-gql";

const Page = () => {
  return (
    <MyApolloClient>
      <Blog />
      <NewPostGql />
    </MyApolloClient>
  );
};

export default Page;

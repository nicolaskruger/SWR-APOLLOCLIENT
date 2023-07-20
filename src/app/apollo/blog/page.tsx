"use client";
import { Blog } from "../../../../components/blog/blog";
import { MyApolloClient } from "../../../../components/my-apollo-client/my-apollo-client";

const Page = () => {
  return (
    <MyApolloClient>
      <Blog />
    </MyApolloClient>
  );
};

export default Page;

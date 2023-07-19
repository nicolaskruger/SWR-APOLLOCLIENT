"use client";

import { LoginGql } from "../../../../components/login-gql/login-gql";
import { MyApolloClient } from "../../../../components/my-apollo-client/my-apollo-client";

const Page = () => {
  return (
    <MyApolloClient>
      <LoginGql />
    </MyApolloClient>
  );
};

export default Page;

"use client";
import useSwr from "swr";

const Page = () => {
  const { data, error, isLoading } = useSwr("/api/user");

  return <div></div>;
};

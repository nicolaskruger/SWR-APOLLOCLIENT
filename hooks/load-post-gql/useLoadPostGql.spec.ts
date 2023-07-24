import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLoadPostGql } from "./useLoadPostGql";

jest.mock("react");
jest.mock("@apollo/client");

const mockUseState = () => {
  const setLastPage = jest.fn((value: boolean) => {});

  const setPage = jest.fn((value: number) => {});

  jest
    .mocked(useState)
    .mockReturnValueOnce([false, setLastPage] as any)
    .mockReturnValueOnce([0, setPage] as any);

  return {
    setLastPage,
    setPage,
  };
};

type PostType = { post: { text: string; id: string }[] };

type MockQueryProps = {
  loading?: boolean;
  data?: PostType;
};

const mockUseQuery = ({ loading, data }: MockQueryProps) => {
  const fetchMore = jest.fn();

  const refetch = jest.fn();

  jest.mocked(useQuery).mockReturnValue({
    loading,
    data,
    refetch,
    fetchMore,
  } as any);

  return {
    fetchMore,
    refetch,
  };
};

describe("useLoadPostGql", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load more data when load more", async () => {
    const { setLastPage, setPage } = mockUseState();

    const { fetchMore } = mockUseQuery({});

    fetchMore.mockReturnValue({ data: { post: [1, 1, 1] } } as any);

    const { loadMore } = useLoadPostGql();

    await loadMore();

    expect(fetchMore).toBeCalled();

    expect(fetchMore.mock.calls[0][0]).toStrictEqual({
      variables: {
        page: 1,
      },
    });

    expect(setPage).toBeCalled();
    expect(setPage).toBeCalledWith(1);
  });
  it("should set last page when return length was las then tree", async () => {
    const { setLastPage, setPage } = mockUseState();

    const { fetchMore } = mockUseQuery({});

    fetchMore.mockReturnValue({ data: { post: [1, 1] } } as any);

    const { loadMore } = useLoadPostGql();

    await loadMore();

    expect(fetchMore).toBeCalled();

    expect(fetchMore.mock.calls[0][0]).toStrictEqual({
      variables: {
        page: 1,
      },
    });

    expect(setPage).toBeCalled();
    expect(setPage).toBeCalledWith(1);

    expect(setLastPage).toBeCalledWith(true);
  });
});

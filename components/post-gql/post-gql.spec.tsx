import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useLoadPostGql } from "../../hooks/load-post-gql/useLoadPostGql";
import { PostGql } from "./post-gql";
import "@testing-library/jest-dom";

jest.mock("../../hooks/load-post-gql/useLoadPostGql");

type MockUsePostGql = Partial<
  Omit<ReturnType<typeof useLoadPostGql>, "loadMore" | "refetch">
>;

export const mockUsePostGql = ({ data, lastPage, loading }: MockUsePostGql) => {
  const loadMore = jest.fn();

  const refetch = jest.fn();

  jest
    .mocked(useLoadPostGql)
    .mockReturnValue({ data, lastPage, loading, loadMore, refetch } as any);

  return {
    loadMore,
    refetch,
  };
};

describe("<PostGql/>", () => {
  it("should render an spinner when loading", () => {
    mockUsePostGql({ loading: true });

    render(<PostGql />);

    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  it("should render data when not loading", () => {
    mockUsePostGql({ data: { post: [{ id: "1", text: "123" }] } });

    render(<PostGql />);

    const li = screen.queryByTestId<HTMLLIElement>("li-post-info");

    expect(li).toBeInTheDocument();

    expect(li?.textContent).toBe("123");
  });

  it("should call load more when click on the button", async () => {
    const { loadMore } = mockUsePostGql({
      data: { post: [{ id: "1", text: "123" }] },
    });

    render(<PostGql />);

    const button = screen.getByTestId<HTMLButtonElement>("button-post-gql");

    await user.click(button);

    await waitFor(() => {
      expect(loadMore).toBeCalled();
    });
  });
});

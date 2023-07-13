import { AxiosError } from "axios";
import { useGetPostInfinite } from "../../hooks/get-post-infinite/useGetPostInfinit";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Post } from "./post";
import user from "@testing-library/user-event";
import { data } from "autoprefixer";

jest.mock("../../hooks/get-post-infinite/useGetPostInfinit");

export const mockGetPostInfinite = ({
  data,
  error,
  isLoading,
  isValidating,
  size,
}: Partial<
  Omit<ReturnType<typeof useGetPostInfinite>, "mutate" | "setSize">
>) => {
  const setSize = jest.fn((v: number) => {});

  jest.mocked(useGetPostInfinite).mockReturnValue({
    data: data || [],
    error: error || new AxiosError(),
    isLoading: isLoading || false,
    isValidating: isValidating || false,
    size: size || 1,
    setSize,
  } as any);

  return {
    setSize,
  };
};

const getInputs = () => {
  const button = screen.getByTestId<HTMLButtonElement>("button-post-load-more");

  return { button };
};

describe("<Post/>", () => {
  it("should render an spinner when loading", () => {
    mockGetPostInfinite({ isLoading: true });

    render(<Post />);
    const spinner = screen.queryByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
  it("should render more post when click on load more button", () => {
    const { setSize } = mockGetPostInfinite({});

    render(<Post />);

    const { button } = getInputs();

    user.click(button);

    expect(setSize).toBeCalledWith(2);
  });

  it("should stop render load more button when post come to an end", () => {
    mockGetPostInfinite({ data: [[{} as any]] });

    render(<Post />);

    const { button } = getInputs();

    expect(button).toBeDisabled();
  });
});

import { useCreatePost } from "../../hooks/create-post/useCreatePost";
import { render, screen } from "@testing-library/react";
import { NewPost } from "./new-post";
import "@testing-library/jest-dom";
import { useToken } from "../../hooks/token/useToken";
import user from "@testing-library/user-event";

jest.mock("../../hooks/token/useToken");
jest.mock("../../hooks/create-post/useCreatePost");

type MockUseCreateProps = Partial<ReturnType<typeof useCreatePost>>;

const mockUseCreatePost = (props: MockUseCreateProps) => {
  jest
    .mocked(useCreatePost)
    .mockReturnValue(props as ReturnType<typeof useCreatePost>);
};

const getDataTestId = () => {
  const input = screen.getByTestId<HTMLInputElement>("input-new-post");
  const button = screen.getByTestId<HTMLButtonElement>("button-new-post");
  const pError = screen.getByTestId<HTMLParagraphElement>("p-new-post-error");

  return {
    input,
    button,
    pError,
  };
};

const mockUseToken = (token: string, setToken: (token: string) => {}) => {
  jest.mocked(useToken).mockReturnValue([token, setToken]);
};

describe("<NewPost/>", () => {
  beforeEach(() => {
    mockUseToken("valid token", jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render an error msg when error occurs", () => {
    mockUseCreatePost({
      error: { response: { data: { msg: "error" } } } as any,
    });

    render(<NewPost />);

    const { pError } = getDataTestId();

    expect(pError).toHaveTextContent("error");
    expect(pError.getAttribute("data-visibility")).toBe("true");
  });
  it("should render an spinner when loading", () => {
    mockUseCreatePost({
      isMutating: true,
    });

    render(<NewPost />);

    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });
  it("should create a post", async () => {
    const trigger = jest.fn(
      async ({ text, token }: { text: string; token: string }) => ({
        msg: "create post",
      })
    );

    mockUseCreatePost({
      trigger,
    });

    render(<NewPost />);

    const { input, button } = getDataTestId();

    await user.type(input, "text");
    await user.click(button);

    expect(trigger.mock.calls[0][0]).toStrictEqual({
      text: "text",
      token: "valid token",
    });
  });
});

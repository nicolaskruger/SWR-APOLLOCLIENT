import { ApolloError } from "@apollo/client";
import { useNewPostGql } from "../../hooks/new-post-gql/useNewPostGql";
import { render, screen, waitFor } from "@testing-library/react";
import { NewPostGql } from "./new-post-gql";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mocked("../../hooks/new-post-gql/useNewPostGql");

type MockNewPostProps = {
  loading?: boolean;
  error?: ApolloError;
};

const mockUseNewPost = ({ error, loading }: MockNewPostProps) => {
  const addPost = jest.fn(async (text: string) => {});

  jest.mocked(useNewPostGql).mockReturnValue({
    addPost,
    error,
    loading,
  } as any);

  return { addPost };
};

const myRender = () => {
  render(<NewPostGql />);
};

const queryAll = () => {
  const spinner = screen.queryByTestId<HTMLParagraphElement>("spinner");
  const error = screen.queryByTestId<HTMLParagraphElement>(
    "p-error-new-post-gql"
  );

  const input = screen.getByTestId<HTMLInputElement>("input-text-new-post-gql");
  const button = screen.getByTestId<HTMLButtonElement>(
    "button-text-new-post-gql"
  );

  return {
    spinner,
    error,
    button,
    input,
  };
};

describe("<NewPotGql/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render error screen", () => {
    mockUseNewPost({ error: { message: "invalid token" } as any });
    myRender();
    const { error } = queryAll();

    expect(error).toBeInTheDocument();

    expect(error?.textContent).toBe("invalid token");
  });
  it("should render loading screen", () => {
    mockUseNewPost({ loading: true });
    myRender();
    const { spinner } = queryAll();

    expect(spinner).toBeInTheDocument();
  });
  it("should post a post", async () => {
    const { addPost } = mockUseNewPost({});
    myRender();

    const { button, input } = queryAll();

    await user.type(input, "new post");

    await user.click(button);

    await waitFor(async () => {
      await expect(addPost).toBeCalledWith("new post");
    });
  });
});

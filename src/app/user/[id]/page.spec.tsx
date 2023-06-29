import { render, screen } from "@testing-library/react";
import { useUser } from "../../../../hooks/user/useUser";
import UserById from "./page";
import "@testing-library/jest-dom";

jest.mock("../../../../hooks/user/useUser");

const renderPage = (info: ReturnType<typeof useUser>) => {
  jest.mocked(useUser).mockReturnValueOnce({
    ...info,
  });
  render(<UserById params={{ id: "nicolas" }} />);
};

describe("<UserById/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render an error msg when error", () => {
    renderPage({
      isError: true,
      isLoading: false,
      user: {} as User,
    });

    expect(screen.queryByTestId("p-error")).toBeInTheDocument();
  });
  it("should render an loading msg when loading", () => {
    renderPage({
      isError: false,
      isLoading: true,
      user: {} as User,
    });

    expect(screen.queryByTestId("p-loading")).toBeInTheDocument();
  });
  it("should loading correctly", () => {
    renderPage({
      isError: false,
      isLoading: false,
      user: {
        email: "nicolas",
        id: "nicolas",
        name: "nicolas",
        password: "123",
      } as User,
    });

    expect(screen.queryByTestId("div-user")).toBeInTheDocument();
  });
});

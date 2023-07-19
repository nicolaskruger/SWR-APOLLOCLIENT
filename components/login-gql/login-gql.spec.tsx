import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { useLoginGql } from "../../hooks/login-gql/useLoginGql";
import { LoginGql } from "./login-gql";

jest.mock("../../hooks/login-gql/useLoginGql");

jest.mock("next/navigation");

type MockUseLoginProps = {
  loading?: boolean;
  error?: any;
};

const mockUseLoginGql = ({ loading, error }: MockUseLoginProps) => {
  const login = jest.fn(async (email: string, password: string) => {});

  jest.mocked(useLoginGql).mockReturnValue({ login, loading, error } as any);

  return { login };
};

const mockUseRoute = () => {
  const push = jest.fn((url: string) => {});

  jest.mocked(useRouter).mockReturnValue({ push } as any);

  return {
    push,
  };
};

describe("<LoginGql/>", () => {
  it("should render an spinner when loading", () => {
    mockUseLoginGql({ loading: true });
    mockUseRoute();
    render(<LoginGql />);

    const spinner = screen.queryByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
  it("should render an error message on error", () => {
    mockUseLoginGql({ error: true });
    mockUseRoute();
    render(<LoginGql />);

    const error = screen.queryByTestId("p-error-login");

    expect(error).toBeInTheDocument();
  });
  it("should login", async () => {
    const { login } = mockUseLoginGql({});

    const { push } = mockUseRoute();

    render(<LoginGql />);

    const emailInput =
      screen.getByTestId<HTMLInputElement>("input-email-login");
    const passwordInput = screen.getByTestId<HTMLInputElement>(
      "input-password-login"
    );

    const button = screen.getByTestId<HTMLButtonElement>("button-login");

    await user.type(emailInput, "punpun@email");
    await user.type(passwordInput, "123");
    await user.click(button);

    await waitFor(() => {
      expect(login).toBeCalledWith("punpun@email", "123");

      expect(push).toBeCalledWith("/apollo/blog");
    });
  });
});

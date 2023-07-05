import { render, screen } from "@testing-library/react";
import Login from "./page";
import user from "@testing-library/user-event";
import { LoginProps, useLogin } from "../../../../hooks/login/useLogin";
import { SWRMutationResponse } from "swr/mutation";
import mockRouter from "next-router-mock";

jest.mock("../../../../hooks/login/useLogin");

jest.mock("next/router", () => require("next-router-mock"));

type MockUseLoginType = SWRMutationResponse<
  { token: string },
  any,
  "/api/swr/user/login",
  LoginProps
>;

describe("<Login />", () => {
  const mockUseLogin = (prop: Partial<MockUseLoginType>) => {
    const ret = { ...prop } as MockUseLoginType;

    jest.mocked(useLogin).mockReturnValue(ret);
  };
  const getAllInfo = () => {
    const inputEmail =
      screen.getByTestId<HTMLInputElement>("input-email-login");
    const inputPassword = screen.getByTestId<HTMLInputElement>(
      "input-password-login"
    );

    const buttonToggleVisibility = screen.getByTestId<HTMLButtonElement>(
      "button-toggle-visibility"
    );

    const buttonElement =
      screen.getByTestId<HTMLButtonElement>("button-form-login");
    const pElement = screen.getByTestId<HTMLParagraphElement>("p-error-login");

    return {
      inputEmail,
      inputPassword,
      buttonElement,
      pElement,
      buttonToggleVisibility,
    };
  };
  const queryAllInfo = () => {
    const inputEmail =
      screen.queryByTestId<HTMLInputElement>("input-email-login");
    const inputPassword = screen.queryByTestId<HTMLInputElement>(
      "input-password-login"
    );

    const buttonToggleVisibility = screen.queryByTestId<HTMLButtonElement>(
      "button-toggle-visibility"
    );

    const buttonElement =
      screen.queryByTestId<HTMLButtonElement>("button-form-login");
    const pElement =
      screen.queryByTestId<HTMLParagraphElement>("p-error-login");

    return {
      inputEmail,
      inputPassword,
      buttonElement,
      pElement,
      buttonToggleVisibility,
    };
  };

  beforeEach(() => {
    mockRouter.push("/swr/login");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    mockUseLogin({});
    render(<Login />);

    const {
      buttonElement,
      buttonToggleVisibility,
      inputEmail,
      inputPassword,
      pElement,
    } = queryAllInfo();

    expect(buttonElement).toBeInTheDocument();
    expect(buttonToggleVisibility).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
  });
  it("should hide and show the password", () => {
    mockUseLogin({});
    render(<Login />);

    const { buttonToggleVisibility, inputPassword } = getAllInfo();

    expect(buttonToggleVisibility.textContent).toBe("show");

    expect(inputPassword.type).toBe("password");

    user.click(buttonToggleVisibility);

    expect(buttonToggleVisibility.textContent).toBe("hide");

    expect(inputPassword.type).toBe("text");
  });

  it("should show an error msg when have error", () => {
    mockUseLogin({
      error: {
        msg: "error on login",
      },
    });
    render(<Login />);

    const { pElement } = getAllInfo();

    expect(pElement).toHaveTextContent("error on login");
  });

  it("should render an spinner when is mutation", () => {
    mockUseLogin({
      isMutating: true,
    });
    render(<Login />);

    const spinner = screen.queryByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should login when have data", () => {
    mockUseLogin({
      data: {
        token: "Bearer 123",
      },
    });
    render(<Login />);

    expect(mockRouter).toMatchObject({
      asPath: "/swr/blog",
    });
  });
});

import { render, screen } from "@testing-library/react";
import Login from "./page";
import user from "@testing-library/user-event";
import { LoginProps, useLogin } from "../../../../hooks/login/useLogin";
import { SWRMutationResponse } from "swr/mutation";
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";
import { useToken } from "../../../../hooks/token/useToken";

jest.mock("../../../../hooks/login/useLogin");

jest.mock("next/navigation", () => require("next-router-mock"));

jest.mock("../../../../hooks/token/useToken");

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
    const setToken = jest.fn();
    jest.mocked(useToken).mockReturnValue(["", setToken]);
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
  it("should hide and show the password", async () => {
    mockUseLogin({});
    render(<Login />);

    const { buttonToggleVisibility, inputPassword } = getAllInfo();

    expect(buttonToggleVisibility.textContent).toBe("show");

    expect(inputPassword.type).toBe("password");

    await user.click(buttonToggleVisibility);

    expect(buttonToggleVisibility.textContent).toBe("hide");

    expect(inputPassword.type).toBe("text");
  });

  it("should show an error msg when have error", () => {
    mockUseLogin({
      error: {
        response: {
          data: {
            msg: "error on login",
          },
        },
      },
    });
    render(<Login />);

    const { pElement } = getAllInfo();

    expect(pElement).toHaveTextContent("error on login");
    expect(pElement.getAttribute("data-visibility")).toBe("true");
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
    const setToken = jest.fn();
    jest.mocked(useToken).mockReturnValue(["", setToken]);

    render(<Login />);

    expect(setToken).toBeCalled();

    expect(setToken).toBeCalledWith("Bearer 123");

    expect(mockRouter).toMatchObject({
      asPath: "/swr/blog",
    });
  });
  it("should no render login when miss email or pass word", async () => {
    const trigger = jest.fn();

    mockUseLogin({
      trigger,
    });

    render(<Login />);
    const { buttonElement } = getAllInfo();

    await user.click(buttonElement);

    expect(trigger).not.toBeCalled();
  });

  it("should login when user and password set", async () => {
    const trigger = jest.fn();

    mockUseLogin({
      trigger,
    });

    render(<Login />);
    const { buttonElement, inputEmail, inputPassword } = getAllInfo();

    await user.type(inputEmail, "nicolas@email.com");

    await user.type(inputPassword, "123");

    await user.click(buttonElement);

    expect(trigger).toBeCalled();

    expect(trigger.mock.calls[0][0]).toStrictEqual({
      email: "nicolas@email.com",
      password: "123",
    });
  });
});

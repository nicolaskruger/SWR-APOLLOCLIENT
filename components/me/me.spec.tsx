import "@testing-library/jest-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useMe } from "../../hooks/me/useMe";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { Me } from "./me";

type MockUseMeReturn = ReturnType<typeof useMe>;

type UseMeReturn = {
  error?: string;
  isLoading?: boolean;
  data?: User;
};

jest.mock("../../hooks/me/useMe");

const mockUseMe = ({ data, error, isLoading }: UseMeReturn) => {
  const mockValue = {} as MockUseMeReturn;

  mockValue.data = data;

  const errorResponse = error
    ? ({
        response: { data: { msg: error as string } },
      } as AxiosError<{ msg: string }, any>)
    : null;

  mockValue.error = errorResponse as AxiosError<{ msg: string }, any>;

  mockValue.isLoading = isLoading as boolean;

  jest.mocked(useMe).mockReturnValue(mockValue);
};

describe("<Me/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render an error msg when error", () => {
    mockUseMe({ error: "error" });

    render(<Me />);

    const pError = screen.getByTestId<HTMLParagraphElement>("p-error-me");

    expect(pError.textContent).toBe("error");
  });
  it("should render an spinner when is loading", () => {
    mockUseMe({ isLoading: true });

    render(<Me />);

    const pSpinner = screen.getByTestId<HTMLParagraphElement>("spinner");

    expect(pSpinner).toBeInTheDocument();
  });
  it("should render an spinner when don't have data", () => {
    mockUseMe({});

    render(<Me />);

    const pSpinner = screen.getByTestId<HTMLParagraphElement>("spinner");

    expect(pSpinner).toBeInTheDocument();
  });
  it("should render correctly when have data", () => {
    mockUseMe({
      data: {
        email: "email",
        id: "id",
        name: "name",
        password: "123",
        url: "url",
      },
    });

    render(<Me />);

    const img = screen.getByTestId<HTMLImageElement>("img-me");
    const pName = screen.getByTestId<HTMLParagraphElement>("p-me-name");
    const pEmail = screen.getByTestId<HTMLParagraphElement>("p-me-email");
    expect(img.src).toBe("http://localhost/url");
    expect(pName.textContent).toBe("name");
    expect(pEmail.textContent).toBe("email");
  });
});

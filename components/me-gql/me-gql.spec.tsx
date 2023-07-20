import { render, screen } from "@testing-library/react";
import { useMeGql } from "../../hooks/me-gql/useMeGql";
import { MeGql } from "./me-gql";

jest.mock("../../hooks/me-gql/useMeGql");

const mockUseMeGql = (props: Partial<ReturnType<typeof useMeGql>>) => {
  jest.mocked(useMeGql).mockReturnValue(props as any);
};

const myRender = () => {
  render(<MeGql />);
};

const queryAll = () => {
  const loadingP = screen.queryByTestId<HTMLParagraphElement>("p-loading-me");
  const errorP = screen.queryByTestId<HTMLParagraphElement>("p-error-me");
  const nameP = screen.queryByTestId<HTMLParagraphElement>("p-name-me");
  const emailP = screen.queryByTestId<HTMLParagraphElement>("p-email-me");

  return {
    errorP,
    nameP,
    emailP,
    loadingP,
  };
};

describe("<MeQql/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render loading screen", () => {
    mockUseMeGql({ loading: true });
    myRender();
    const { loadingP } = queryAll();

    expect(loadingP).toBeInTheDocument();
  });
  it("should render error", () => {
    mockUseMeGql({ error: { message: "invalid token" } as any });
    myRender();
    const { errorP } = queryAll();

    expect(errorP).toBeInTheDocument();

    expect(errorP?.textContent).toBe("invalid token");
  });

  it("should render data", () => {
    mockUseMeGql({
      data: { me: { email: "punpun@email", name: "punpun" } } as any,
    });
    myRender();
    const { emailP, nameP } = queryAll();

    expect(emailP).toBeInTheDocument();
    expect(emailP?.textContent).toBe("punpun@email");

    expect(nameP).toBeInTheDocument();
    expect(nameP?.textContent).toBe("punpun@email");
  });
});

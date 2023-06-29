import { render, screen } from "@testing-library/react";
import { UserPage } from "./user-page";
import useSwr, { SWRResponse } from "swr";

jest.mock("swr");

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("<UserPage/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render an error msg when error", async () => {
    jest.mocked(useSwr).mockImplementationOnce(() => {
      return { error: true } as SWRResponse;
    });
    render(<UserPage />);
    await delay(1000);
    const p = screen.getByTestId<HTMLParagraphElement>("p-error-message");
    expect(p.textContent).toBe("can't fetch");
  });
  it("should render an loading mdg when loading", () => {
    jest.mocked(useSwr).mockImplementationOnce(() => {
      return { isLoading: true } as SWRResponse;
    });

    render(<UserPage />);

    const p = screen.getByTestId<HTMLParagraphElement>("p-loading");

    expect(p.textContent).toBe("loading...");
  });
  it("should render a component fetch is correct", async () => {
    jest.mocked(useSwr).mockImplementationOnce(() => {
      return {
        data: [
          {
            name: "string",
            email: "string",
            id: "string",
            password: "string",
          },
        ],
      } as SWRResponse;
    });

    render(<UserPage />);

    await delay(1000);

    const user = screen.getAllByTestId("li-user");

    expect(user.length).toBe(1);
  });
});

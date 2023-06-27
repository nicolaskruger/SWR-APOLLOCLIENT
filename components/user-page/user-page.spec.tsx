import { render, screen } from "@testing-library/react";
import axios from "axios";
import { UserPage } from "./user-page";

jest.mock("axios");

type User = {
  name: string;
  email: string;
  id: string;
  password: string;
};

type SwrMock = {
  data: User[];
  isLoading: boolean;
  error: boolean;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("<UserPage/>", () => {
  it("should render an error msg when error", () => {
    jest.mocked(axios).get.mockImplementation(() => {
      throw new Error();
    });

    render(<UserPage />);

    const p = screen.getByTestId<HTMLParagraphElement>("p-error-message");

    expect(p.textContent).toBe("can't fetch");
  });
  it("should render an loading mdg when loading", () => {
    jest.mocked(axios).get.mockImplementation(async () => {
      await delay(3000);
    });

    render(<UserPage />);

    const p = screen.getByTestId<HTMLParagraphElement>("p-loading");

    expect(p.textContent).toBe("loading...");
  });
  it("should render a component fetch is correct", () => {
    jest.mocked(axios).get.mockResolvedValue({
      data: [
        {
          name: "string",
          email: "string",
          id: "string",
          password: "string",
        },
      ],
    });
    render(<UserPage />);

    const user = screen.getAllByTestId("ul-user");

    expect(user.length).toBe(1);
  });
});

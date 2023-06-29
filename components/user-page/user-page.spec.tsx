import { render, screen } from "@testing-library/react";
import axios from "axios";
import { UserPage } from "./user-page";
import { cache } from "swr/_internal";
import { SWRConfig } from "swr";

jest.mock("axios");

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("<UserPage/>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render an error msg when error", async () => {
    jest.mocked(axios).get.mockImplementation(() => {
      throw new Error();
    });
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <UserPage />
      </SWRConfig>
    );
    await delay(1000);
    const p = screen.getByTestId<HTMLParagraphElement>("p-error-message");
    expect(p.textContent).toBe("can't fetch");
  });
  it("should render an loading mdg when loading", () => {
    jest.mocked(axios).get.mockImplementation(async () => {
      await delay(3000);
    });

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <UserPage />
      </SWRConfig>
    );

    const p = screen.getByTestId<HTMLParagraphElement>("p-loading");

    expect(p.textContent).toBe("loading...");
  });
  it("should render a component fetch is correct", async () => {
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
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <UserPage />
      </SWRConfig>
    );

    await delay(1000);

    const user = screen.getAllByTestId("li-user");

    expect(user.length).toBe(1);
  });
});

import { InputUser } from "./input-user";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getInputs = () => {
  const input = screen.getByTestId<HTMLInputElement>("input-input-user");
  const button = screen.getByTestId<HTMLButtonElement>("button-input-user");
  const errorMsg = screen.getByTestId<HTMLParagraphElement>("p-error-message");

  return {
    input,
    button,
    errorMsg,
  };
};

describe("<InputUser/>", () => {
  beforeEach(() => {
    render(<InputUser />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not send new user when input is empty", () => {
    const { button } = getInputs();

    user.click(button);

    expect(jest.mocked(axios).post).toBeCalledTimes(0);
  });

  it("should render a msg when something went wrong", async () => {
    const { button, input, errorMsg } = getInputs();

    const mockAxios = jest.mocked(axios);

    mockAxios.post.mockImplementation(() => {
      throw new Error();
    });

    await user.type(input, "name");

    expect(errorMsg.getAttribute("data-show")).toBe("false");

    await user.click(button);

    await delay(500);

    expect(errorMsg.getAttribute("data-show")).toBe("true");

    await delay(3000);

    expect(errorMsg.getAttribute("data-show")).toBe("false");
  });

  it("should send new user", async () => {
    const { button, input } = getInputs();
    const mockAxios = jest.mocked(axios);

    mockAxios.post.mockResolvedValueOnce({
      data: {
        msg: "create user with success",
      },
    });

    await user.type(input, "name");

    await user.click(button);

    expect(mockAxios.post).toBeCalled();

    expect(mockAxios.post.mock.calls[0][0]).toBe("/api/user");
    expect(mockAxios.post.mock.calls[0][1]).toStrictEqual({
      name: "name",
      email: "name@email.com",
    });
  });
});

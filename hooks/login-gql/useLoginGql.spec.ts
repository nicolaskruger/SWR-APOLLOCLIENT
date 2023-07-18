import { useLazyQuery } from "@apollo/client";
import { useLoginGql } from "./useLoginGql";
import { useToken } from "../token/useToken";

jest.mock("../token/useToken");
jest.mock("@apollo/client");

describe("useLoginGcl", () => {
  it("should login", async () => {
    const getLogin = jest.fn();

    const setToken = jest.fn();
    jest.mocked(useLazyQuery).mockReturnValue([getLogin, {}] as any);

    jest.mocked(useToken).mockReturnValue(["token", setToken]);

    const { login } = useLoginGql();

    getLogin.mockResolvedValue({ data: { token: "Bearer 123" } });

    await login("email", "password");

    expect(getLogin.mock.calls[0][0]).toStrictEqual({
      variables: {
        email: "email",
        password: "password",
      },
    });

    expect(setToken).toBeCalledWith("Bearer 123");
  });
});

import { readFileConverter } from "../readFileConverter";
import { loginRepository } from "./login-repository";
import jwt from "jsonwebtoken";

jest.mock("../readFileConverter");
jest.mock("jsonwebtoken");

describe("loginRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should not login when password or email is invalid", () => {
    const readFileMock = jest.mocked(readFileConverter);

    readFileMock.mockReturnValue([]);

    expect(() => {
      loginRepository.login("email", "password");
    }).toThrow("email or password invalid");

    expect(readFileMock).toBeCalledWith("./db/user.json");
  });

  it("should login", () => {
    const readFileMock = jest.mocked(readFileConverter);

    const jwtMock = jest.mocked(jwt);

    jwtMock.sign.mockReturnValue("Bearer 123" as any);

    readFileMock.mockReturnValue([
      {
        id: "1",
        email: "email",
        password: "password",
      },
    ]);

    const { token } = loginRepository.login("email", "password");

    expect(jwtMock.sign.mock.calls[0][0]).toStrictEqual({
      id: "1",
    });

    expect(jwtMock.sign.mock.calls[0][1]).toBe("shh");

    expect(token).toBe("Bearer 123");

    expect(readFileMock).toBeCalledWith("./db/user.json");
  });
});

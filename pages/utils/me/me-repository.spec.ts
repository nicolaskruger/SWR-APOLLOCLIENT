import jwt from "jsonwebtoken";
import { readFileConverter } from "../readFileConverter";
import { meRepository } from "./me-repository";

jest.mock("jsonwebtoken");

jest.mock("../readFileConverter");

describe("meRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should throw an error when token is invalid", () => {
    jest.mocked(jwt).verify.mockImplementation(() => {
      throw new Error("invalid token");
    });
    expect(() => {
      meRepository.decodeToken("token");
    }).toThrow(Error);
  });

  it("should throw an error when don't find user", () => {
    jest.mocked(jwt).verify.mockReturnValue({
      id: "1",
    } as any);

    jest.mocked(readFileConverter).mockReturnValue([]);

    expect(() => {
      meRepository.decodeToken("token");
    }).toThrow(Error);
  });

  it("should return an user when token is correct", () => {
    jest.mocked(jwt).verify.mockReturnValue({
      id: "1",
    } as any);

    jest.mocked(readFileConverter).mockReturnValue([
      {
        id: "1",
      },
    ]);

    const user = meRepository.decodeToken("token");

    expect(user.id).toBe("1");
  });
});

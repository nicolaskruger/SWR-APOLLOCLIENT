import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import me from ".";
import { readFileConverter } from "../../../utils/readFileConverter";

jest.mock("../../../utils/readFileConverter");
describe("me", () => {
  const generateRes = () => {
    const res = {} as NextApiResponse;

    const json = jest.fn();
    const status = jest.fn(() => res);

    res.json = json;
    res.status = status;

    return {
      res,
      json,
      status,
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should through an error when don't have the token", () => {
    const req = { method: "GET" } as NextApiRequest;
    const { res, json, status } = generateRes();

    me(req, res);

    expect(status).toBeCalledWith(401);
    expect(json.mock.calls[0][0]).toStrictEqual({
      msg: "Unauthorized",
    });
  });
  it("should through an error when the token is invalid", () => {
    const req = { method: "GET" } as NextApiRequest;
    req.headers = {
      authorization: "Bearer 123",
    };
    const { res, json, status } = generateRes();

    me(req, res);

    expect(status).toBeCalledWith(401);
    expect(json.mock.calls[0][0]).toStrictEqual({
      msg: "Unauthorized",
    });
  });
  it("should return an user when token is valid", () => {
    const token = jwt.sign({ id: "nicolas" }, "shh");

    const nicolas: User = {
      email: "nicolas",
      id: "nicolas",
      name: "nicolas",
      password: "123",
      url: "/img/nicolas",
    };

    const readFileMock = jest.mocked(readFileConverter);

    readFileMock.mockReturnValue([nicolas]);

    const req = { method: "GET" } as NextApiRequest;
    req.headers = {
      authorization: `Bearer ${token}`,
    };
    const { res, json } = generateRes();

    me(req, res);

    expect(readFileMock.mock.calls[0][0]).toBe("./db/user.json");
    expect(json.mock.calls[0][0]).toStrictEqual(nicolas);
  });
});

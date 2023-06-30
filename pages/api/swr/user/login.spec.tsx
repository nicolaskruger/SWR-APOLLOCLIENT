import { NextApiRequest, NextApiResponse } from "next";
import { readFileConverter } from "../../../utils/readFileConverter";
import loginUserSWRApi from "./login";

jest.mock("../../../utils/readFileConverter");

describe("loginUserSWRApi", () => {
  const mockUser = (user: Partial<User>) => {
    jest.mocked(readFileConverter).mockReturnValue([user]);
  };

  const generateReqWithUser = (user: Pick<User, "email" | "password">) => {
    const req = {
      method: "GET",
    } as NextApiRequest;
    const res = {} as NextApiResponse;
    req.query = user;
    return req;
  };

  const generateResponse = () => {
    const res = {} as NextApiResponse;

    const json = jest.fn((obj: any) => {});
    const status = jest.fn((value: number) => res);

    return { res, json, status };
  };

  it("should not login when user or password is wrong", () => {
    const req = generateReqWithUser({ email: "punpun@email", password: "321" });
    const { res, json, status } = generateResponse();

    mockUser({ email: "punpun@email", password: "123" });

    loginUserSWRApi(req, res);

    expect(status).toBeCalledWith(401);

    expect(json.mock.calls[0][0]).toStrictEqual({
      msg: "email or password incorrect",
    });
  });

  it("should login", () => {
    const req = generateReqWithUser({ email: "punpun@email", password: "123" });
    const { res, json, status } = generateResponse();

    mockUser({ email: "punpun@email", password: "123" });

    loginUserSWRApi(req, res);

    expect(status).toBeCalledWith(200);

    expect(json.mock.calls[0][0]).toContain("token");
  });
});

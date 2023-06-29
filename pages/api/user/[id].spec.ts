import { NextApiRequest, NextApiResponse } from "next";
import { readFileConverter } from "../../utils/readFileConverter";
import apiHandler from "./[id]";

jest.mock("../../utils/readFileConverter", () => ({
  readFileConverter: jest.fn((value: string) => {}),
}));

describe("/api/user/[id]", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return an error when user not found", () => {
    const req = { method: "GET", query: {} } as NextApiRequest;
    req.query.id = "not found";

    const status = jest.fn((status: number) => res);
    const json = jest.fn((obj: { msg: string }) => {});
    const res = {} as NextApiResponse;
    res.status = status;
    res.json = json;

    jest.mocked(readFileConverter).mockReturnValueOnce([{ id: "nicolas" }]);

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(404);

    expect(json.mock.calls[0][0]).toStrictEqual({
      msg: "user not found",
    });
  });
  it("should found a user", () => {
    const req = { method: "GET", query: {} } as NextApiRequest;
    req.query.id = "nicolas";

    const status = jest.fn((status: number) => res);
    const json = jest.fn((obj: { msg: string }) => {});
    const res = {} as NextApiResponse;
    res.status = status;
    res.json = json;

    jest.mocked(readFileConverter).mockReturnValueOnce([{ id: "nicolas" }]);

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(200);

    expect(json.mock.calls[0][0]).toStrictEqual({
      id: "nicolas",
    });
  });
});

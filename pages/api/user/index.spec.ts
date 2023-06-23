import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from ".";

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

const users: User[] = [
  {
    name: "nicolas",
    email: "nicolas@email",
    id: "nicolas",
    password: "123",
  },
];

jest.mock("../../utils/readFileConverter", () => ({
  readFileConverter: (value: string) => users,
}));
describe("user api", () => {
  it("get", () => {
    const req = { method: "GET" } as NextApiRequest;
    const json = jest.fn((obj: any) => {});
    const res = {} as NextApiResponse;
    res.json = json;
    apiHandler(req, res);
    expect(json.mock.calls[0][0]).toStrictEqual({ user: users });
  });
});

import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from ".";
import { writeFileConverter } from "../../utils/writeFileConverter";
import { readFileConverter } from "../../utils/readFileConverter";
import { run } from "node:test";

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

const testUser = (a: User, b: User) => {
  a.id = "";
  b.id = "";

  expect(a).toStrictEqual(b);
};

const users: User[] = [
  {
    name: "nicolas",
    email: "nicolas@email",
    id: "nicolas",
    password: "123",
  },
];
jest.mock("../../utils/writeFileConverter", () => ({
  writeFileConverter: jest.fn((path: string, content: any) => {}),
}));

jest.mock("../../utils/readFileConverter", () => ({
  readFileConverter: jest.fn((value: string) => users),
}));
describe("user api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("get", () => {
    const req = { method: "GET" } as NextApiRequest;
    const json = jest.fn((obj: any) => {});
    const res = {} as NextApiResponse;
    res.json = json;
    apiHandler(req, res);
    expect(json.mock.calls[0][0]).toStrictEqual({ user: users });
  });
  it("post: cant post when miss information", () => {
    const req = { method: "POST", body: {} } as NextApiRequest;
    const res = {} as NextApiResponse;

    const json = jest.fn((obj: any) => {});

    const status = jest.fn((status: Number) => res);

    res.json = json;
    res.status = status;

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(400);
    expect(json.mock.calls[0][0]).toStrictEqual({ msg: "incomplete user" });
  });
  it("post", () => {
    const req = {
      method: "POST",
      body: {
        name: "ana",
        email: "ana@email",
        password: "123",
      },
    } as NextApiRequest;
    const res = {} as NextApiResponse;

    const json = jest.fn((obj: any) => {});

    const status = jest.fn((status: Number) => res);

    res.json = json;
    res.status = status;

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(201);
    expect(json.mock.calls[0][0]).toStrictEqual({ msg: "created" });

    expect(jest.mocked(writeFileConverter).mock.calls[0][0]).toBe(
      "./db/user.json"
    );

    expect(writeFileConverter).toHaveBeenCalled();

    const users = jest.mocked(writeFileConverter).mock.calls[0][1] as User[];

    const expectedUser: User[] = [
      {
        name: "nicolas",
        email: "nicolas@email",
        id: "nicolas",
        password: "123",
      },
      {
        name: "ana",
        email: "ana@email",
        password: "123",
        id: "a",
      },
    ];
    users.forEach((a, index) => {
      testUser({ ...a }, { ...expectedUser[index] });
    });
  });
  it("put: user not found", () => {
    const req = {
      method: "PUT",
      body: {
        id: "not found",
        name: "nk",
        email: "nk@email",
        password: "123",
      },
    } as NextApiRequest;
    const res = {} as NextApiResponse;

    jest.mocked(readFileConverter).mockReturnValueOnce([]);

    const json = jest.fn((obj: any) => {});

    const status = jest.fn((status: Number) => res);

    res.json = json;
    res.status = status;

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(404);
    expect(json.mock.calls[0][0]).toStrictEqual({ msg: "user not found" });
  });

  it("put", () => {
    const req = {
      method: "PUT",
      body: {
        id: "nk",
        name: "nk",
        email: "nk@email",
        password: "123",
      },
    } as NextApiRequest;
    const res = {} as NextApiResponse;

    jest.mocked(readFileConverter).mockReturnValueOnce([
      {
        id: "nk",
        name: "nicolas",
        email: "nicolas@email",
        password: "123",
      },
      {
        id: "ana",
        name: "ana",
        email: "ana@email",
        password: "123",
      },
    ]);

    const json = jest.fn((obj: any) => {});

    const status = jest.fn((status: Number) => res);

    res.json = json;
    res.status = status;

    apiHandler(req, res);

    expect(status.mock.calls[0][0]).toBe(201);
    expect(json.mock.calls[0][0]).toStrictEqual({
      msg: "updated with success",
    });

    expect(writeFileConverter).toHaveBeenCalled();

    expect(jest.mocked(writeFileConverter).mock.calls[0][0]).toBe(
      "./db/user.json"
    );

    expect(jest.mocked(writeFileConverter).mock.calls[0][1]).toStrictEqual([
      {
        id: "nk",
        name: "nk",
        email: "nk@email",
        password: "123",
      },
      {
        id: "ana",
        name: "ana",
        email: "ana@email",
        password: "123",
      },
    ]);
  });
});

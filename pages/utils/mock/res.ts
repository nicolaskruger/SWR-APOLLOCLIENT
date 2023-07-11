import { NextApiResponse } from "next";

const mockRes = () => {
  const res = {} as NextApiResponse;

  const status = jest.fn((status: number) => res);

  const json = jest.fn();

  res.json = json;

  res.status = status;

  return {
    res,
    status,
    json,
  };
};

export { mockRes };

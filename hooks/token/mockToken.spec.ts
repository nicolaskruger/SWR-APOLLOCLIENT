import { useToken } from "./useToken";

const mockToken = (token: string) => {
  const setToken = jest.fn((value: string) => {});

  jest.mocked(useToken).mockReturnValue([token, setToken]);

  return { setToken };
};

export { mockToken };

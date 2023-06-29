import useSwr, { SWRResponse } from "swr";
import { useUser } from "./useUser";

const myUser = {
  email: "user@email",
  id: "user",
  name: "user",
  password: "123",
};

jest.mock("swr");
describe("useUser", () => {
  it("should convert items correctly", () => {
    jest.mocked(useSwr).mockImplementationOnce(() => {
      const data: User = myUser;

      const response: SWRResponse = {
        data,
        error: false,
        isLoading: false,
      } as SWRResponse;

      return response;
    });
    const { isError, isLoading, user } = useUser("user");

    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
    expect(user).toStrictEqual(myUser);
  });
});

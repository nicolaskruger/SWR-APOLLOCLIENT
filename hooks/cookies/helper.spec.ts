import { parseCookies, setCookie } from "nookies";
import { getMyCookies, setMyCookies } from "./helper";

jest.mock("nookies");

describe("cookies", () => {
  beforeEach(() => {
    jest.mocked(parseCookies).mockReturnValue({
      token: "Bearer 123",
    });
  });

  it("should return null when token not found", () => {
    const cookie = getMyCookies("noToken");
    expect(cookie).toBeFalsy();
  });

  it("should get a cookies when its exists", () => {
    const cookie = getMyCookies("token");
    expect(cookie).toBe("Bearer 123");
  });

  it("should set a cookie", () => {
    setMyCookies("info", "new info");

    const calls = jest.mocked(setCookie).mock.calls;

    expect(calls[0][0]).toBeNull();
    expect(calls[0][1]).toBe("info");
    expect(calls[0][2]).toBe("new info");
    expect(calls[0][3]).toStrictEqual({
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  });
});

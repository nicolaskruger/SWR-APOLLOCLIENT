import { useState } from "react";
import { getMyCookies, setMyCookies } from "./helper";
import { useCookies } from "./useCookies";

jest.mock("./helper");

jest.mock("react");

describe("useCookies", () => {
  const setCookies = jest.fn();

  beforeEach(() => {
    jest.mocked(getMyCookies).mockReturnValue("Bearer 123");
    jest.mocked(useState).mockReturnValue(["Bearer 123", setCookies]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set correctly value", () => {
    const [value, setValue] = useCookies("key");

    expect(value).toBe("Bearer 123");

    setValue("Bearer 321");

    const calls = jest.mocked(setMyCookies).mock.calls;

    expect(calls[0][0]).toBe("key");
    expect(calls[0][1]).toBe("Bearer 321");
  });
});

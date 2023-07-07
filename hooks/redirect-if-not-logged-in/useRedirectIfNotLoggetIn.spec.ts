import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRedirectIfNotLogged } from "./useRedirectIfNotLoggedIn";
import { useMe } from "../me/useMe";
import { SWRResponse } from "swr";
import { AxiosError } from "axios";

jest.mock("next/navigation");

jest.mock("../me/useMe");

const mockUseRoute = () => {
  const push = jest.fn((value: string) => {});

  const props = {} as AppRouterInstance;

  props.push = push;

  jest.mocked(useRouter).mockReturnValue(props);

  return jest.mocked(props);
};

const mockUseMe = (
  props: Partial<
    SWRResponse<
      User,
      AxiosError<
        {
          msg: string;
        },
        any
      >,
      any
    >
  >
) => {
  jest.mocked(useMe).mockReturnValue(props as SWRResponse);
};

describe("useRedirectIfNotLoggedIn", () => {
  it("should redirect if token is invalid", () => {
    const { push } = mockUseRoute();

    const error = {
      response: {
        data: {
          msg: "123",
        },
      },
    } as AxiosError;

    mockUseMe({ error } as SWRResponse);

    useRedirectIfNotLogged();

    expect(push).toBeCalled();
    expect(push).toBeCalledWith("/swr/login");
  });
  it("should not redirect if token is valid", () => {
    const { push } = mockUseRoute();

    mockUseMe({ data: {} as User });

    useRedirectIfNotLogged();
    expect(push).not.toBeCalled();
  });
});

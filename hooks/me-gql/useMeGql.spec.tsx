import { QueryResult, useQuery } from "@apollo/client";
import { useToken } from "../token/useToken";
import { mockToken } from "../token/mockToken.spec";
import { useMeGql } from "./useMeGql";
import { render, screen } from "@testing-library/react";

jest.mock("../token/useToken");
jest.mock("@apollo/client");

const mockUseQuery = ({ data, error, loading }: Partial<QueryResult>) => {
  jest.mocked(useQuery).mockReturnValue({ data, error, loading } as any);
};

const SampleComponent = () => {
  const { data, error, loading } = useMeGql();

  return (
    <ul>
      {data && <li data-testid="data">data</li>}
      {error && <li data-testid="error">error</li>}
      {loading && <li data-testid="loading">loading</li>}
    </ul>
  );
};

const renderSample = () => {
  render(<SampleComponent />);
};

const queryAll = () => {
  const dataLi = screen.queryByTestId("data");
  const errorLi = screen.queryByTestId("error");
  const loadingLi = screen.queryByTestId("loading");

  return {
    dataLi,
    errorLi,
    loadingLi,
  };
};
describe("useMeGql", () => {
  it("should show an error when it occurs", () => {
    mockToken("invalid token");
    mockUseQuery({ error: {} as any });
    renderSample();
    const { errorLi } = queryAll();

    expect(errorLi).toBeInTheDocument();
  });
  it("should loading when is loading", () => {
    mockToken("invalid token");
    mockUseQuery({ loading: true });
    renderSample();

    const { loadingLi } = queryAll();

    expect(loadingLi).toBeInTheDocument();
  });

  it("should send the write data when is needed", () => {
    mockToken("invalid token");
    mockUseQuery({
      data: {
        me: {
          name: "Punpun Onodera",
          email: "punpun@email",
          password: "123",
          id: "punpun",
          url: "/user/punpun.webp",
        },
      },
    });
    renderSample();

    const { dataLi } = queryAll();

    expect(dataLi).toBeInTheDocument();
  });
});

export { mockUseQuery };

import { NextApiRequest, NextApiResponse } from "next";
import { meRepository } from "../../../utils/me/me-repository";
import postApi from ".";
import { mockRes } from "../../../utils/mock/res";
import { postRepository } from "../../../utils/post/post-repository";

jest.mock("../../../utils/me/me-repository");
jest.mock("../../../utils/post/post-repository");

describe("postApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should not add one post when token was invalid", () => {
    const req = {} as NextApiRequest;

    req.method = "POST";

    req.headers = {
      authorization: "invalid token",
    };

    const { json, res, status } = mockRes();

    jest.mocked(meRepository).decodeToken.mockImplementation(() => {
      throw new Error("invalid token");
    });

    postApi(req, res);

    expect(jest.mocked(postRepository).addPost).not.toBeCalled();
    expect(json.mock.calls[0][0]).toStrictEqual({ msg: "invalid token" });

    expect(status).toBeCalledWith(401);
  });

  it("should add one post", () => {
    const req = {} as NextApiRequest;

    req.body = {
      text: "text",
    };

    req.method = "POST";

    req.headers = {
      authorization: "valid token",
    };

    const { json, res, status } = mockRes();

    jest.mocked(meRepository).decodeToken.mockReturnValue({
      id: "id",
    } as User);

    postApi(req, res);

    expect(json.mock.calls[0][0]).toStrictEqual({ msg: "post created" });

    const post: Post = jest.mocked(postRepository).addPost.mock.calls[0][0];

    expect(post.text).toBe("text");

    expect(post.userId).toBe("id");

    expect(status).toBeCalledWith(201);
  });
});

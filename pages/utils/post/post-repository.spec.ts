import { readFileConverter } from "../readFileConverter";
import { writeFileConverter } from "../writeFileConverter";
import { postRepository } from "./post-repository";

jest.mock("../readFileConverter");

jest.mock("../writeFileConverter");

describe("postRepository", () => {
  it("should post a post", () => {
    const post: Post = {
      date: new Date().toISOString(),
      id: "id",
      text: "text",
      userId: "user",
    };

    const readFileMock = jest.mocked(readFileConverter);

    readFileMock.mockReturnValue([]);

    postRepository.addPost(post);

    expect(readFileMock.mock.calls[0][0]).toBe("./db/post.json");

    const writeFileMocked = jest.mocked(writeFileConverter);

    expect(writeFileMocked.mock.calls[0][1]).toStrictEqual([post]);
  });
});

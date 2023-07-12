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

    expect(writeFileMocked.mock.calls[0][0]).toStrictEqual("./db/post.json");
    expect(writeFileMocked.mock.calls[0][1]).toStrictEqual([post]);
  });
  it("should return a specific page with limit", () => {
    const date = new Date().toISOString();

    const posts: Post[] = " "
      .repeat(10)
      .split("")
      .map(
        (v, i) =>
          ({
            id: i.toString(),
            date: date,
            userId: "1",
          } as Post)
      );

    const user = {
      name: "name",
      id: "1",
    } as User;

    const readFileMock = jest.mocked(readFileConverter);

    readFileMock.mockImplementation((v) => {
      if (v === "./db/post.json") return posts;
      if (v === "./db/user.json") return [user];
      return [];
    });

    const ret = postRepository.getPaginatedPost(2, 3);

    const expectedReturn = " "
      .repeat(3)
      .split("")
      .map(
        (v, i) =>
          ({
            id: (i + 3).toString(),
            date: date,
            user: {
              id: "1",
              name: "name",
            },
          } as PostAllInfo)
      );
    expect(ret).toStrictEqual(expectedReturn);
  });
});

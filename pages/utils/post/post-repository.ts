import { MyDictionary } from "../../../types/dictionary";
import { readFileConverter } from "../readFileConverter";
import { writeFileConverter } from "../writeFileConverter";

const postRepository = {
  addPost: (post: Post) => {
    const posts = readFileConverter("./db/post.json") as Post[];
    writeFileConverter("./db/post.json", [...posts, post]);
  },
  getPaginatedPost: (page: number, limit: number): PostAllInfo[] => {
    const posts = readFileConverter<Post[]>("./db/post.json");

    const users = readFileConverter<User[]>("./db/user.json");

    const userDic: MyDictionary<string, User> = users.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: curr,
      };
    }, {});

    const allInfoPost: PostAllInfo[] = posts
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice((page - 1) * limit, page * limit)
      .map((p) => {
        const user = userDic[p.userId];

        return {
          date: p.date,
          id: p.id,
          text: p.text,
          user: {
            email: user.email,
            id: user.id,
            name: user.name,
            url: user.url || "",
          },
        };
      });

    return allInfoPost;
  },
};

export { postRepository };

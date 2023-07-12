import { readFileConverter } from "../readFileConverter";
import { writeFileConverter } from "../writeFileConverter";

const postRepository = {
  addPost: (post: Post) => {
    const posts = readFileConverter("./db/post.json") as Post[];
    writeFileConverter("./db/post.json", [...posts, post]);
  },
  getPaginatedPost: (page: number, limit: number): PostAllInfo[] => {
    return [];
  },
};

export { postRepository };

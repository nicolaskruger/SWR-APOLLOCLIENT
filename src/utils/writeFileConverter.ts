import fs from "fs";

const writeFileConverter = <T>(
  path: "./db/user.json" | "./db/post.json" | "./db/comment.json",
  content: T
) => {
  fs.writeFileSync(path, JSON.stringify(content));
};

export { writeFileConverter };

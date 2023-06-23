import fs from "fs";

const readFileConverter = <T>(
  path: "./db/user.json" | "./db/post.json" | "./db/comment.json"
): T => {
  const json = `${fs.readFileSync(path)}`;

  const ret: T = JSON.parse(json);

  return ret;
};

export { readFileConverter };

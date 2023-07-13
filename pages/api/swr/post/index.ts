import { NextApiHandler } from "next";
import { generateRoutes } from "../../../utils/routes";
import { meRepository } from "../../../utils/me/me-repository";
import { postRepository } from "../../../utils/post/post-repository";

const post: NextApiHandler = (req, res) => {
  const token = req.headers.authorization || "";

  const newPost: Pick<Post, "text"> = req.body;

  try {
    const user = meRepository.decodeToken(token);

    postRepository.addPost({
      date: new Date().toISOString(),
      id: `${Math.random()}`,
      text: newPost.text,
      userId: user.id,
    });

    return res.status(201).json({ msg: "post created" });
  } catch (error) {
    return res.status(401).json({ msg: "invalid token" });
  }
};

const get: NextApiHandler = (req, res) => {
  const token = req.headers.authorization || "";

  const { page, limit } = req.query;

  try {
    meRepository.decodeToken(token);

    const pages = postRepository.getPaginatedPost(Number(page), Number(limit));

    return res.status(200).json(pages);
  } catch (error) {
    return res.status(401).json({ msg: "invalid token" });
  }
};

const postApi: NextApiHandler = (req, res) => {
  const route = generateRoutes({
    POST: post,
    GET: get,
  });

  return route(req, res);
};

export default postApi;

import { generateRoutes } from "../../utils/routes";
import { NextApiHandler } from "next";
import { readFileConverter } from "../../utils/readFileConverter";
import { writeFileConverter } from "../../utils/writeFileConverter";

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

const keysOfUser: (keyof User)[] = ["email", "id", "name", "password"];

const post: NextApiHandler = (req, res) => {
  const users: User[] = readFileConverter("./db/user.json");
  const body: Omit<User, "id"> = req.body;

  const newUser: User = {
    ...body,
    id: `${Math.random()}`.slice(2, 5),
  };

  const invalidUser = keysOfUser.some((key) => !newUser[key as keyof User]);

  if (invalidUser) return res.status(400).json({ msg: "incomplete user" });

  writeFileConverter("./db/user.json", [...users, newUser]);
  res.status(201).json({
    msg: "created",
  });
};

const get: NextApiHandler = (req, res) => {
  const user: User[] = readFileConverter("./db/user.json");
  return res.json({
    user,
  });
};

const apiHandler: NextApiHandler = (req, res) => {
  const route = generateRoutes({
    GET: get,
    POST: post,
  });

  return route(req, res);
};

export default apiHandler;

import { generateRoutes } from "../../utils/routes";
import { NextApiHandler, NextApiRequest } from "next";
import { readFileConverter } from "../../utils/readFileConverter";
import { writeFileConverter } from "../../utils/writeFileConverter";

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

const keysOfUser: (keyof User)[] = ["email", "id", "name", "password"];

const invalidateUserFunc = (user: User) =>
  keysOfUser.some((key) => !user[key as keyof User]);
const post: NextApiHandler = (req, res) => {
  const users: User[] = readFileConverter("./db/user.json");
  const body: Omit<User, "id"> = req.body;

  const newUser: User = {
    ...body,
    id: `${Math.random()}`.slice(2, 5),
  };

  const invalidUser = invalidateUserFunc(newUser);

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

const put: NextApiHandler = (req, res) => {
  const users: User[] = readFileConverter("./db/user.json");

  const user: User = req.body;

  const invalidUser = invalidateUserFunc(user);

  if (invalidUser)
    return res.status(400).json({
      msg: "invalid user",
    });
  const currentUser = users.find(({ id }) => user.id === id);

  if (!currentUser)
    return res.status(404).json({
      msg: "user not found",
    });

  const newUsers = users.map((oldUser) => {
    if (oldUser.id === user.id) return user;
    return oldUser;
  });

  writeFileConverter("./db/user.json", newUsers);

  return res.status(201).json({
    msg: "updated with success",
  });
};

const deleteFunc: NextApiHandler = (req, res) => {
  const { id } = req.query;
  const users: User[] = readFileConverter("./db/user.json");

  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ msg: "user not found" });

  const newUsers = users.filter((u) => u.id !== id);

  writeFileConverter("./db/user.json", newUsers);

  return res.json({ msg: "user delete with success" });
};

const patch: NextApiHandler = (req, res) => {
  const user: Partial<User> = req.body;

  const users: User[] = readFileConverter("./db/user.json");

  const foundUser = users.find((u) => user.id === u.id);

  if (!foundUser) return res.status(404).json({ msg: "user not found" });

  writeFileConverter(
    "./db/user.json",
    users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          ...user,
        };
      }
      return u;
    })
  );

  return res.json({ msg: "update with success" });
};

const apiHandler: NextApiHandler = (req, res) => {
  const route = generateRoutes({
    GET: get,
    POST: post,
    PUT: put,
    DELETE: deleteFunc,
    PATCH: patch,
  });

  return route(req, res);
};

export default apiHandler;

import { NextApiHandler } from "next";
import { generateRoutes } from "../../utils/routes";
import { readFileConverter } from "../../utils/readFileConverter";

type User = {
  name: string;
  id: string;
  email: string;
  password: string;
};

const get: NextApiHandler = (req, res) => {
  const { id } = req.query;

  const users = readFileConverter<User[]>("./db/user.json");

  const user = users.find((user) => id === user.id);

  if (!user) return res.status(404).json({ msg: "user not found" });

  return res.status(200).json({
    ...user,
  });
};

const apiHandler: NextApiHandler = (req, res) => {
  const route = generateRoutes({
    GET: get,
  });

  return route(req, res);
};

export default apiHandler;

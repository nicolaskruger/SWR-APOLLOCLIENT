import { NextApiHandler } from "next";
import { readFileConverter } from "../../../utils/readFileConverter";
import { generateRoutes } from "../../../utils/routes";
import jwt from "jsonwebtoken";

const get: NextApiHandler = (req, res) => {
  const user = req.query as Pick<User, "email" | "password">;

  const users: User[] = readFileConverter("./db/user.json");

  const findUser = users.find((listUser) => listUser.email === user.email);

  if (!findUser || findUser.password !== user.password)
    return res.status(401).json({ msg: "email or password incorrect" });

  const token = jwt.sign({ id: findUser.id }, "shh");

  return res.status(200).json({ token });
};

const loginUserSWRApi: NextApiHandler = (req, res) => {
  return generateRoutes({
    GET: get,
  })(req, res);
};

export default loginUserSWRApi;

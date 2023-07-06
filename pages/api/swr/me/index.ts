import { NextApiHandler, NextApiResponse } from "next";
import { generateRoutes } from "../../../utils/routes";
import jwt from "jsonwebtoken";
import { readFileConverter } from "../../../utils/readFileConverter";

const returnError = (res: NextApiResponse) =>
  res.status(401).json({ msg: "Unauthorized" });

const get: NextApiHandler = (req, res) => {
  const auth = req?.headers?.authorization;

  if (!auth) return returnError(res);

  try {
    const decode = jwt.verify(auth.replace(/Bearer */, ""), "shh") as {
      id: string;
    };

    if (!decode?.id) return returnError(res);

    const users: User[] = readFileConverter("./db/user.json");

    const user = users.find((user) => user.id === decode.id);

    if (!user) return returnError(res);

    return res.json(user);
  } catch {
    return returnError(res);
  }
};

const me: NextApiHandler = (req, res) => {
  const routes = generateRoutes({
    GET: get,
  });

  return routes(req, res);
};

export default me;

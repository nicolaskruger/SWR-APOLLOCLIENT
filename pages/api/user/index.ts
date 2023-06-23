import { MyRoute, generateRoutes } from "@/utils/routes";
import { NextApiHandler } from "next";
import { readFileConverter } from "@/utils/readFileConverter";

type User = {
  name: string;
  email: string;
  password: string;
  id: string;
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
  });

  return route(req, res);
};

export default apiHandler;

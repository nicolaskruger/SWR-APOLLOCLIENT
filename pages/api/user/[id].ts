import { NextApiHandler } from "next";
import { generateRoutes } from "../../utils/routes";

const get: NextApiHandler = (req, res) => {
  throw new Error();
};

const apiHandler: NextApiHandler = (req, res) => {
  const route = generateRoutes({
    GET: get,
  });

  return route(req, res);
};

export default apiHandler;

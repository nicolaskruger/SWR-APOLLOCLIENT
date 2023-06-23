import { NextApiHandler } from "next";
import { Dictionary } from "./dictionay";

export type MyRoute = Partial<
  Dictionary<"GET" | "POST" | "DELETE" | "PATCH" | "PUT", NextApiHandler>
>;

const generateRoutes =
  (routes: MyRoute): NextApiHandler =>
  (req, res) => {
    const route = routes[req.method as keyof MyRoute];

    if (!route)
      return res.status(404).json({
        msg: "method doesn't exists",
      });

    return route(req, res);
  };

export { generateRoutes };

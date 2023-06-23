import { NextApiHandler } from "next";

const apiHandler: NextApiHandler = (req, res) => {
  return res.json({
    msg: "hello word",
  });
};

export default apiHandler;

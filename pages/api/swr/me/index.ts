import { NextApiHandler } from "next";

const me: NextApiHandler = (req, res) => {
  return res.status(501);
};

export default me;

import { NextApiHandler } from "next";

const postApi: NextApiHandler = (req, res) => {
  return res.status(501).json({
    msg: "not implemented",
  });
};

export default postApi;

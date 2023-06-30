import { NextApiHandler } from "next";
import { readFileConverter } from "../../../utils/readFileConverter";

const loginUserSWRApi: NextApiHandler = (req, res) => {
  return res.status(501).json({});
};

export default loginUserSWRApi;

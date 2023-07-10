import jwt from "jsonwebtoken";
import { readFileConverter } from "../readFileConverter";

const throwError = () => {
  throw new Error("invalid token");
};

const meRepository = {
  decodeToken: (auth: string): User => {
    if (!auth) throwError();
    try {
      const decode = jwt.verify(auth.replace(/Bearer */, ""), "shh") as {
        id: string;
      };

      if (!decode?.id) return throwError();

      const users: User[] = readFileConverter("./db/user.json");

      const user = users.find((user) => user.id === decode.id);

      if (!user) return throwError();

      return user;
    } catch {
      return throwError();
    }
  },
};

export { meRepository };

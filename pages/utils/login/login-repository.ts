import { readFileConverter } from "../readFileConverter";
import jwt from "jsonwebtoken";

const loginRepository = {
  login: (email: string, password: string) => {
    const users: User[] = readFileConverter("./db/user.json");

    const findUser = users.find((listUser) => {
      return listUser.email === email;
    });

    if (!findUser || findUser.password !== password)
      throw new Error("email or password invalid");

    const token = `Bearer ${jwt.sign({ id: findUser.id }, "shh")}`;

    return { token };
  },
};

export { loginRepository };

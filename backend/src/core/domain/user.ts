import { Entity } from "../app/base";
import { User as UserType } from "../../../generated/prisma";
import { User as UserDTO } from "@/core/app/dto/api.dto";
import bcrypt from "bcrypt";

export class User implements Entity {
  user: UserType;
  constructor(user: UserType) {
    this.user = user;
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (this.user.password) {
      return await bcrypt.compare(password, this.user.password);
    }
    return false;
  }

  getData: () => UserDTO = () => {
    const { password, updatedAt, provider, ...data } = this.user;
    return data;
  };
}

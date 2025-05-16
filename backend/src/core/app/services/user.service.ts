import { userRepo } from "@/core/infrastructure/repositories";
import { ConstraintError } from "../base";

export const userService = {
  searchUsersByName: async ({ name }: { name: string }) => {
    if (!name) {
      throw new ConstraintError("Name is required", 400);
    }

    const users = await userRepo.findByName({ name });

    if (!users) {
      throw new ConstraintError("No users found", 404);
    }

    return users;
  },
};

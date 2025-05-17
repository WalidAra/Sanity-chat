import { redisClient } from "@/helpers";

export async function flash() {
  await redisClient.flushAll();
}

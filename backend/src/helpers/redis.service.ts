import { config } from "@/config";
import { createClient, RedisClientType } from "redis";

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: config.redisUrl,
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    this.client.connect().catch((err) => {
      console.error("Failed to connect to Redis", err);
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}

const redisClient = RedisService.getInstance().getClient();

export { redisClient };

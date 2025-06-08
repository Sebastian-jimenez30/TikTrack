import IRedisRepository from "@/application/repositories/redis.repository.interface";
import redis from "@/infrastructure/database/redis";
export default class RedisRepository implements IRedisRepository {
  async publish(channel: string, message: string): Promise<void> {
    await redis.publish(channel, message);
  }
}

export default interface IRedisRepository {
  publish(channel: string, message: string): Promise<void>;
}

import Redis from "ioredis";

export class CacheService {
  redis = new Redis(process.env.REDIS_URL as string);

  fetch = async <T>(
    key: string,
    fetcher: () => Promise<T | null>,
    expires: number
  ) => {
    const existing = await this.get<T>(key);

    if (existing !== null) return existing;

    return this.set(key, fetcher, expires * 1000);
  };

  get = async <T>(key: string): Promise<T | null> => {
    const value = await this.redis.get(key);
    if (value === null) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  };

  getBuffer = async (key: string) => {
    const value = await this.redis.getBuffer(key);
    if (value === null) return null;
    return value;
  };

  setString = async (key: string, value: string, expires: number) => {
    await this.redis.set(key, JSON.stringify(value), "EX", expires * 1000);
    return value;
  };

  set = async <T>(key: string, fetcher: () => T, expires: number) => {
    const value = await fetcher();
    await this.redis.set(key, JSON.stringify(value), "EX", expires * 1000);
    return value;
  };

  setBuffer = async (key: string, value: ArrayBuffer, expires: number) => {
    await this.redis.set(
      key,
      Buffer.from(new Uint8Array(value)),
      "EX",
      expires * 1000
    );
    return value;
  };

  del = async (key: string) => {
    await this.redis.del(key);
  };

  perge = async () => {
    await this.redis.flushall();
  };
}

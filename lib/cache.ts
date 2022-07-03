import Redis from "ioredis";
import "colors";
import { performance } from "node:perf_hooks";

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
    const cacheT0 = performance.now();
    const value = await this.redis.get(key);
    const cacheT1 = performance.now();
    // console.debug(
    //   `[Redis][Get]`.yellow,
    //   `for ${key} took ${cacheT1 - cacheT0} milliseconds.`
    // );
    if (value === null) return null;
    return JSON.parse(value);
  };

  getBuffer = async (key: string) => {
    const cacheT0 = performance.now();
    const value = await this.redis.getBuffer(key);
    const cacheT1 = performance.now();
    // console.debug(
    //   `[Redis][Get]`.yellow,
    //   `for ${key} took ${cacheT1 - cacheT0} milliseconds.`
    // );
    if (value === null) return null;
    return value;
  };

  set = async <T>(key: string, fetcher: () => T, expires: number) => {
    const t1 = performance.now();
    const value = await fetcher();
    const t2 = performance.now();
    // console.debug(
    //   `[Database][Set]`.yellow,
    //   `for ${key} took ${t2 - t1} milliseconds.`
    // );
    const t3 = performance.now();
    await this.redis.set(key, JSON.stringify(value), "EX", expires * 1000);
    const t4 = performance.now();
    // console.debug(
    //   `[Redis][Set]`.yellow,
    //   `for ${key} took ${t3 - t4} milliseconds.`
    // );
    return value;
  };

  setBuffer = async (key: string, value: ArrayBuffer, expires: number) => {
    const t1 = performance.now();
    await this.redis.set(
      key,
      Buffer.from(new Uint8Array(value)),
      "EX",
      expires * 1000
    );
    const t2 = performance.now();
    // console.debug(
    //   `[Redis][Set]`.yellow,
    //   `for ${key} took ${t1 - t2} milliseconds.`
    // );
    return value;
  };

  del = async (key: string) => {
    const t1 = performance.now();
    await this.redis.del(key);
    const t2 = performance.now();
    // console.debug(
    //   `[Redis][Delete]`.yellow,
    //   `for ${key} took ${t1 - t2} milliseconds.`
    // );
  };

  perge = async () => {
    await this.redis.flushall();
  };
}
import axios from "axios";
// import axiosRetry from "axios-retry";
import got from "got";
import { CacheService } from "./cache";
import { stringToHash } from "./hash";

// const client = axios.create({
//   baseURL: "https://api.writesonic.com/v1/business/content",
//   headers: {
//     accept: "application/json",
//     "X-API-KEY": "7bfde6b2-3a26-402b-9808-3f84640fadd4",
//     "Content-Type": "application/json",
//   },
//   params: {
//     end_user_id: "idarase@gmail.com",
//     engine: "business",
//     language: "en",
//   },
// });

// axiosRetry(client, {
//   retries: 3,
//   retryCondition(error: any) {
//     return error?.response?.status >= 500;
//   },
//   retryDelay: (retryCount) => {
//     return retryCount * 1000;
//   },
//   onRetry(_, error: any) {
//     console.warn(`Request failed, retrying...`);
//   },
// });

export class Dalle {
  private bearerToken = process.env.DALLE_TOKEN;
  private url = "https://labs.openai.com/api/labs";
  private cache = new CacheService();

  public async generateImage(prompt: string): Promise<string | null> {
    const hash = stringToHash(prompt);
    const existing: string | null = await this.cache.get(hash);

    if (existing) {
      return existing;
    }

    const generation: any = await this.generate(prompt);
    const imageUrl = generation?.data[0]?.generation?.image_path;

    if (!imageUrl) {
      await this.cache.setString(hash, "", 3650);

      return "";
    }

    const response = await axios.request<ArrayBuffer>({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(new Uint8Array(response.data)).toString(
      "base64"
    );

    await this.cache.setString(hash, base64, 3650);

    return base64;
  }

  private async generate(prompt: string) {
    let task: any = await got
      .post(`${this.url}/tasks`, {
        json: {
          task_type: "text2im",
          prompt: {
            caption: prompt,
            batch_size: 4,
          },
        },
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
        },
      })
      .json();

    return await new Promise((resolve) => {
      const refreshIntervalId = setInterval(async () => {
        task = await this.getTask(task.id);

        switch (task.status) {
          case "succeeded":
            clearInterval(refreshIntervalId);
            return resolve(task.generations);
          case "rejected":
            clearInterval(refreshIntervalId);
            console.log(`Prompt "${prompt}" was rejected`);
            return resolve(null);
          case "pending":
        }
      }, 2000);
    });
  }

  private async getTask(taskId: string) {
    return await got
      .get(`${this.url}/tasks/${taskId}`, {
        headers: {
          Authorization: "Bearer " + this.bearerToken,
        },
      })
      .json();
  }

  private async list(options = { limit: 50, fromTs: 0 }) {
    return await got
      .get(
        `${this.url}/tasks?limit=${options.limit}${
          options.fromTs ? `&from_ts=${options.fromTs}` : ""
        }`,
        {
          headers: {
            Authorization: "Bearer " + this.bearerToken,
          },
        }
      )
      .json();
  }

  private async getCredits() {
    return await got
      .get(`${this.url}/billing/credit_summary`, {
        headers: {
          Authorization: "Bearer " + this.bearerToken,
        },
      })
      .json();
  }
}

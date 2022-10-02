import * as dotenv from "dotenv";

dotenv.config();

import axios from "axios";
import axiosRetry from "axios-retry";
import { CacheService } from "./cache";
import { stringToHash } from "./hash";

const client = axios.create({
  baseURL: "https://labs.openai.com/api/labs",
  headers: {
    Authorization: `Bearer ${process.env.DALLE_TOKEN}`,
  },
});

axiosRetry(client, {
  retries: 3,
  retryCondition(error: any) {
    return error?.response?.status >= 500;
  },
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  onRetry(_, error: any) {
    console.warn(`Request failed, retrying...`);
  },
});

export class Dalle {
  private cache = new CacheService();

  public async generateImage(prompt: string): Promise<string | null> {
    const hash = stringToHash(prompt);
    const existing: string | null = await this.cache.getString(hash);

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
    let task: any = await client
      .post("/tasks", {
        task_type: "text2im",
        prompt: {
          caption: prompt,
          batch_size: 4,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("[DALLE] Error getting tasks", error);
      });

    return await new Promise((resolve) => {
      const refreshIntervalId = setInterval(async () => {
        task = await this.getTask(task.id);

        switch (task.status) {
          case "succeeded":
            clearInterval(refreshIntervalId);
            return resolve(task.generations);
          case "rejected":
            clearInterval(refreshIntervalId);
            console.error(`Prompt "${prompt}" was rejected`);
            return resolve(null);
          case "pending":
        }
      }, 2000);
    });
  }

  private async getTask(taskId: string) {
    return await client
      .get(`/tasks/${taskId}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("[DALLE] Error getting task by id", error);
      });
  }

  private async list(options = { limit: 50, fromTs: 0 }) {
    return await client.get(
      `/tasks?limit=${options.limit}${
        options.fromTs ? `&from_ts=${options.fromTs}` : ""
      }`
    );
  }

  private async getCredits() {
    return await client.get("/billing/credit_summary", {});
  }
}

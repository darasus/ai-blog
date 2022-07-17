import axios from "axios";
import { CacheService } from "./cache";
import { stringToHash } from "./hash";
import axiosRetry from "axios-retry";

const client = axios.create({
  baseURL: "https://api.writesonic.com/v1/business/content",
  headers: {
    accept: "application/json",
    "X-API-KEY": "7bfde6b2-3a26-402b-9808-3f84640fadd4",
    "Content-Type": "application/json",
  },
  params: {
    end_user_id: "idarase@gmail.com",
    engine: "business",
    language: "en",
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

export class Writesonic {
  private cache = new CacheService();

  private generateIntro = async ({
    title,
  }: {
    title: string;
  }): Promise<string> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title })),
      () =>
        client
          .post("/blog-intros", {
            blog_title: title,
          })
          .then((response) => response.data[0].text)
          .catch((error) => {
            const e = {
              code: error?.code,
              status: error?.response?.status,
              message: error?.response?.statusText,
            };
            console.log("Error generating intro: ", e);
            throw e;
          }),
      3650
    );

  private generateOutlines = async ({
    title,
    intro,
  }: {
    title: string;
    intro: string;
  }): Promise<string[]> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title, intro })),
      () =>
        client
          .post("/blog-outlines", {
            blog_title: title,
            blog_intro: intro,
          })
          .then((response) => response.data[0].text)
          .then((text) => text.split("\n").map((line: string) => line.trim()))
          .catch((error) => {
            const e = {
              code: error?.code,
              status: error?.response?.status,
              message: error?.response?.statusText,
            };
            console.log("Error generating outlines: ", e);
            throw e;
          }),
      3650
    );

  private generateContent = async ({
    title,
    intro,
    outlines,
  }: {
    title: string;
    intro: string;
    outlines: string[];
  }): Promise<string> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title, intro, outlines })),
      () =>
        client
          .post("/ai-article-writer-v3", {
            article_title: title,
            article_intro: intro,
            article_sections: outlines,
          })
          .then((response) => response.data.data[0].content)
          .catch((error) => {
            const e = {
              code: error?.code,
              status: error?.response?.status,
              message: error?.response?.statusText,
            };
            console.log("Error generating content: ", e);
            throw e;
          }),
      3650
    );

  public generateArticle = async ({
    title,
  }: {
    title: string;
  }): Promise<{ title: string; content: string }> => {
    const intro = await this.generateIntro({ title });
    const outlines = await this.generateOutlines({ title, intro });
    const content = await this.generateContent({ title, intro, outlines });

    return { title, content };
  };
}

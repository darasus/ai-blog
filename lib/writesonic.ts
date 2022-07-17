import axios from "axios";
import { CacheService } from "./cache";
import { stringToHash } from "./hash";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export class Writesonic {
  private client = axios.create({
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
  private cache = new CacheService();

  private generateIntro = async ({
    title,
  }: {
    title: string;
  }): Promise<string> =>
    this.cache.fetch(
      stringToHash(JSON.stringify({ title })),
      () =>
        this.client
          .post("/blog-intros", {
            blog_title: title,
          })
          .then((response) => response.data[0].text)
          .catch((error) => {
            console.log("Error generating intro: ", error);
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
        this.client
          .post("/blog-outlines", {
            blog_title: title,
            blog_intro: intro,
          })
          .then((response) => response.data[0].text)
          .then((text) => text.split("\n").map((line: string) => line.trim()))
          .catch((error) => {
            console.log("Error generating outlines: ", error);
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
        this.client
          .post("/ai-article-writer-v3", {
            article_title: title,
            article_intro: intro,
            article_sections: outlines,
          })
          .then((response) => response.data.data[0].content)
          .catch((error) => {
            console.log("Error generating article: ", error);
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

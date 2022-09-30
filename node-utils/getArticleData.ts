import { keys } from "ramda";
import { data } from "../data/data";
import { Category } from "../types";

export function getArticleData() {
  return keys(data).reduce<
    {
      title: string;
      category: Category;
    }[]
  >((prev, next) => {
    const articles = data[next];
    const newData = articles.map((title) => ({ title, category: next }));
    return [...prev, ...newData];
  }, []);
}

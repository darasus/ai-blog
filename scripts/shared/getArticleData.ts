import { keys } from "ramda";
import { data } from "../../data/data";
import { Input } from "./types";

export function getArticleData() {
  return keys(data).reduce<Input[]>((prev, next) => {
    const articles = data[next];
    const newData = articles.map((title) => ({ title, category: next }));
    return [...prev, ...newData];
  }, []);
}

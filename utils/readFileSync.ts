import fs from "node:fs";
import path from "node:path";
import { POSTS_PATH } from "./paths";

export const readArticleFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(POSTS_PATH, basename), encoding);
  } catch (error) {
    return null;
  }
};

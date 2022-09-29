import fs from "node:fs";
import path from "node:path";
import { postsPath } from "./paths";

export const readArticleFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(postsPath, basename), encoding || "utf8");
  } catch (error) {
    return null;
  }
};

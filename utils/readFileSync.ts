import fs from "node:fs";
import path from "node:path";
import { POSTS_PATH, POST_IMAGES_PATH } from "./paths";

export const readArticleFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(POSTS_PATH, basename), encoding || "utf8");
  } catch (error) {
    return null;
  }
};

export const readArticleImageFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(POST_IMAGES_PATH, basename), "binary");
  } catch (error) {
    return null;
  }
};

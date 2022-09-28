import fs from "node:fs";
import path from "node:path";
import { POST_IMAGES_PATH } from "./paths";

export const readArticleImageFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(POST_IMAGES_PATH, basename));
  } catch (error) {
    return null;
  }
};

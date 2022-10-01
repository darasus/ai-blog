import fs from "node:fs";
import path from "node:path";
import { imagesPath } from "./paths";

export const readArticleImageFile = (
  basename: string,
  encoding?: BufferEncoding
) => {
  try {
    return fs.readFileSync(path.join(imagesPath, basename), encoding);
  } catch (error) {
    return null;
  }
};

import fs from "node:fs";
import { postsPath } from "./paths";

// postFilePaths is the list of all mdx files inside the postsPath directory
export const postFilePaths = fs
  .readdirSync(postsPath)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

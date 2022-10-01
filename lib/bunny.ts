import axios from "axios";
import sharp from "sharp";
import { readArticleImageFile } from "../node-utils/readArticleImageFile";
import fs from "fs";
import { imagesPath } from "../node-utils/paths";
import fetch from "node-fetch";

export async function uploadImage(basename: string) {
  console.log("uploading " + basename);
  //   const image = readArticleImageFile(basename + ".png");
  const image = fs.readFileSync(`${imagesPath}/${basename}.png`);
  if (!image) return null;
  //   const img = sharp(image);
  //   const base64url = image.buffer.toString();
  //   const base64 = "data:image/png;base64," + base64url;
  const base64 = "data:image/png;base64," + image.toString("base64");

  return fetch(
    `https://storage.bunnycdn.com/theaipaper/images/${basename}.png`,
    {
      method: "PUT",
      headers: {
        AccessKey: "4375ddb6-d5bd-49f3-8167f7215ace-58ef-4eb0",
        "content-type": "application/octet-stream",
      },
      body: base64,
    }
  );
}

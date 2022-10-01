import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import path from "path";
import { uploadImage } from "../lib/bunny";
import { imagesPath } from "../node-utils/paths";
import { generateArticles } from "./generateArticles";
import { generateSitemap } from "./generateSitemap";

async function generate() {
  // let spinner = ora({
  //   text: "Start generating...",
  //   prefixText: "🚀",
  // }).start();
  // spinner.stopAndPersist();
  // spinner.start();

  // await generateArticles(spinner);
  // await generateSitemap(spinner);

  await new Promise(async (resolve, reject) => {
    await uploadImage(
      "3-easy-exercises-you-can-do-in-your-home-that-will-make-you-lose-weight"
    );
    resolve(true);
  });

  // spinner.prefixText = "✅";
  // spinner.text = `All done!`;
  // spinner.stopAndPersist();
  process.exit(0);
}

generate();

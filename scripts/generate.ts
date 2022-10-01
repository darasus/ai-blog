import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import { generateArticles } from "./generateArticles";
import { generateRelatedArticles } from "./generateRelatedArticles";
import { generateSitemap } from "./generateSitemap";

async function generate() {
  let spinner = ora({
    text: "Start generating...",
    prefixText: "🚀",
  }).start();
  spinner.stopAndPersist();
  spinner.start();

  await generateArticles(spinner);
  await generateRelatedArticles(spinner);
  await generateSitemap(spinner);

  spinner.prefixText = "✅";
  spinner.text = `All done!`;
  spinner.stopAndPersist();
  process.exit(0);
}

generate();

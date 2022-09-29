import { generateArticles } from "./generateArticles";
import { generateSitemap } from "./generateSitemap";

async function generate() {
  await generateArticles();
  await generateSitemap();
}

generate();

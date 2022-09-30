import * as dotenv from "dotenv";

dotenv.config();

import { Translate } from "../lib/translate";
import { getArticleData } from "../node-utils/getArticleData";

async function translate() {
  const translateApi = new Translate();

  const titlesAndCategories = getArticleData();

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    const response = await translateApi.translate(title);
    console.log(JSON.stringify(response.data, null, 2));
  }
}

translate();

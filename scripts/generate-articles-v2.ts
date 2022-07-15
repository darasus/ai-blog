const sdk = require("api")("@writesonic/v1.0#2s3px1bl460pumy");

const title = "3 recipes for homemade bread that's better than store-bought";

const generateIntro = async ({ title }: { title: string }) => {
  return sdk["blog_intros_v1_business_content_blog_intros_post"](
    { blog_title: title },
    {
      end_user_id: "fsfsefsef",
      engine: "business",
      language: "en",
    }
  ).catch((err: any) => console.error(err));
};

const generateOutlines = ({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) => {
  return sdk["blog_outlines_v1_business_content_blog_outlines_post"]({
    blog_title: "title",
    blog_intro: "ssfsefef",
  }).catch((err: any) => console.error(err));
};

const generateArticle = async ({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: string[];
}) => {
  return sdk[
    "ai_article_writer_v3_v1_business_content_ai_article_writer_v3_post"
  ]({
    article_sections: sections,
    article_title: title,
    article_intro: intro,
  }).catch((err: any) => console.error(err));
};

const main = async () => {
  const intro = await generateIntro({ title });

  console.log(JSON.stringify(intro));

  //   const outlines = await generateOutlines({ title, intro });
  //   const article = await generateArticle({ title, intro, sections: outlines });
  //   console.log(article);
};

export {};

main();

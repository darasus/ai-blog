import { getPosts, getRawPosts } from "../node-utils/getPosts";
import { writeArticle } from "../node-utils/writeArticle";

export async function generateRelatedArticles() {
  const oldPosts = await getRawPosts();

  console.log(`✏️ Generating related articles for ${oldPosts.length} posts `);

  for (const [i, post] of oldPosts.entries()) {
    if (post.relatedArticles.length > 0) {
      break;
    }
    const relatedPosts = await getPosts({
      locale: post.locale,
      category: post.category,
      excludeBySlug: [post.slug],
      order: "random",
      numberOfItems: 10,
    });

    writeArticle({
      ...post,
      relatedArticles: relatedPosts.data,
    });
  }

  console.log(`✅ Done generating ${oldPosts.length} related articles!`);
}

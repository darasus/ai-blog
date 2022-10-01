import { Ora } from "ora";
import { getPosts, getRawPosts } from "../node-utils/getPosts";
import { writeArticle } from "../node-utils/writeArticle";

export async function generateRelatedArticles(spinner: Ora) {
  spinner.start();
  const oldPosts = await getRawPosts();

  for (const [i, post] of oldPosts.entries()) {
    spinner.prefixText = "✏️";
    spinner.text = `Generating related articles for post titled (${i + 1}/${
      oldPosts.length
    }): ${post.title}`;
    const relatedPosts = await getPosts({
      locale: post.locale,
      category: post.category,
      excludeBySlug: [post.slug],
      order: "random",
      numberOfItems: 10,
    });

    writeArticle({
      ...post,
      relatedArticles: relatedPosts.data.map(
        ({ relatedArticles, content, ...rest }) => rest
      ),
    });
  }

  spinner.stopAndPersist();
  spinner.start();
  spinner.prefixText = "✅";
  spinner.text = `Done generating ${oldPosts.length} related articles!`;
  spinner.stopAndPersist();
}

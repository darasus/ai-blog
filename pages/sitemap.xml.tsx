import { GetServerSideProps } from "next";
import { TPost } from "../types/Post";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = "https://www.theaipaper.com";
  const posts: TPost[] = [];
  const paths: { url: string; updatedAt: string }[] = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post!);
  }

  const orderedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => ({ ...post }));

  for (const post of orderedPosts) {
    paths.push({
      url: `${BASE_URL}/p/${post?.slug}`,
      updatedAt: `${post?.updatedAt}`,
    });
  }

  const numberOfPages = Math.floor(paths.length / 10);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_URL}/</loc>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
    ${paths
      .map(({ url, updatedAt }) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })
      .join("")}
      ${Array.from({ length: numberOfPages }).map((_, i) => {
        return `
          <url>
            <loc>${BASE_URL}/posts/${i + 1}</loc>
            <lastmod>${new Date(
              orderedPosts[orderedPosts.length - 1].updatedAt
            ).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })}
    </urlset>
  `.trim();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

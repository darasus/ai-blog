import { GetServerSideProps } from "next";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = "https://theaipaper.com";
  const paths: { url: string; updatedAt: string }[] = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    paths.push({
      url: `${BASE_URL}/p/${post?.slug}`,
      updatedAt: `${post?.updatedAt}`,
    });
  }

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

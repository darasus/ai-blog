import data from "../data.json";
import { getPosts } from "./getPosts";

export function generatePostPageStaticPaths() {
  return (data as any).map((post: any) => ({
    params: { slug: post.slug },
    locale: post.locale,
  }));
}

export async function generatePostsPageStaticPaths() {
  const enPosts = await getPosts({
    locale: "en",
    page: 1,
  });
  const esPosts = await getPosts({
    locale: "es",
    page: 1,
  });
  const enPaths = Array.from({ length: enPosts.totalPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
    locale: "en",
  }));
  const esPaths = Array.from({ length: esPosts.totalPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
    locale: "es",
  }));

  return [...enPaths, ...esPaths];
}

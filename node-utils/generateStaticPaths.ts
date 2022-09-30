import data from "../data.json";
import { Locale } from "../types";
import { getPosts } from "./getPosts";

type Res = Array<{
  params: { [key: string]: string };
  locale: Locale;
}>;

export function generatePostPageStaticPaths() {
  const res = (data as any[]).map((post: any) => ({
    params: { slug: post.slug as string },
    locale: post.locale,
  }));

  return res as Res;
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

  return [...enPaths, ...esPaths] as Res;
}

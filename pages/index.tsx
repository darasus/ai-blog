import type { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { articleTitles } from "../data/articleTitles";
import { AI } from "../lib/ai";
import { stringToSlug } from "../utils/slugToString";

const Home: NextPage = ({ articles }: any) => {
  return (
    <>
      {articles.map(({ title, mdxSource }: any, i: number) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <Link href={`/p/${encodeURIComponent(stringToSlug(title))}`}>
            <h2>
              <b>{title}</b>
            </h2>
          </Link>
          <MDXRemote {...mdxSource} />
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  const ai = new AI();

  const articles = await Promise.all(
    articleTitles.map((articleTitle) =>
      ai
        .createCompletion(
          `Generate 1000 words article body titled "${articleTitle}"`
        )
        .then((response) => ({
          title: articleTitle,
          response,
        }))
    )
  );

  const res = [];

  for (const article of articles) {
    const source = article?.response?.choices?.[0].text as string;
    const mdxSource = await serialize(source);

    res.push({ title: article.title, mdxSource });
  }

  return {
    props: { articles: res },
  };
};

export default Home;

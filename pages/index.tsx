import type { NextApiRequest, NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { articleTitles } from "../data/articleTitles";
import { AI } from "../lib/ai";

const Home: NextPage = ({ articles }: any) => {
  console.log(articles);
  return (
    <>
      {articles.map(({ title, mdxSource }: any, i: number) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <h2>
            <b>{title}</b>
          </h2>
          <MDXRemote {...mdxSource} />
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const ai = new AI();

  const articles = [];

  for (const articleTitle of articleTitles) {
    const response = await ai.createCompletion(
      `Generate 1000 words article body titled "${articleTitle}"`
    );

    const source = response?.choices?.[0].text as string;
    console.log(source);

    const mdxSource = await serialize(source);
    articles.push({ title: articleTitle, mdxSource });
  }

  return {
    props: { articles },
  };
};

export default Home;

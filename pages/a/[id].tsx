import type { NextApiRequest, NextPage } from "next";
import { AI } from "../../lib/ai";
import { slugToString } from "../../utils/slugToString";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const Home: NextPage = ({ mdxSource = "" }: any) => {
  return <MDXRemote {...mdxSource} />;
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const ai = new AI();

  const response = await ai.createCompletion(
    `generate 1000 words markdown article with title "${slugToString(
      req.query.id as string
    )}"`
  );

  const source = response?.choices?.[0].text as string;

  const mdxSource = await serialize(source);

  return {
    props: { mdxSource: mdxSource },
  };
};

export default Home;

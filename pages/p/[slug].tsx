import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { Post } from "../../types/Post";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

export default function Home({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{`${post.title} | The Reader AI`}</title>
      </Head>
      <h1>{post.title}</h1>
      <MDXRemote {...post.content} />
    </>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getPost(`${params.slug}.md`);

  return {
    props: { post },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.md?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

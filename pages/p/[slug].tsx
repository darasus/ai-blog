import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { Meta } from "../../components/Meta";
import { Post } from "../../types/Post";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

export default function Home({ post }: { post: Post }) {
  const { title, content, createdAt, description } = post;

  return (
    <div className="p-4">
      <Head>
        <Meta title={title} description={description} />
      </Head>
      <article>
        <span className="text-gray-400 text-xs">{createdAt}</span>
        <h1>{title}</h1>
        <MDXRemote {...content} />
      </article>
    </div>
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

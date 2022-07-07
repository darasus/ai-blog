import { MDXRemote } from "next-mdx-remote";
import { Meta } from "../../components/Meta";
import { Post } from "../../components/Post/Post";
import { PostMeta } from "../../components/Post/PostMeta";
import { TPost } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

export default function Home({ post }: { post: TPost }) {
  const { title, content, createdAt, description, category } = post;

  return (
    <div className="p-4">
      <Meta title={title} description={description} />
      <Post post={post} />
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

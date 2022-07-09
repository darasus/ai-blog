import capitalize from "capitalize";
import Link from "next/link";
import { Meta } from "../../components/Meta";
import { Post } from "../../components/Post/Post";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { TPost } from "../../types/Post";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

interface Props {
  post: TPost;
  posts: TPost[];
}

export default function Home({ post, posts }: Props) {
  const { title, content, createdAt, description, category } = post;

  return (
    <>
      <div className="p-4">
        <Meta title={title} description={description} />
        <Post post={post} />
      </div>
      <div>
        <div className="border-y border-gray-200 p-4 uppercase font-bold text-lg text-gray-500">
          {`Other in ${capitalize.words(category)}`}
        </div>
        {posts.map((post, i: number) => (
          <Link href={`/p/${post.slug}`} key={i}>
            <a className="pointer block border-b last:border-none border-gray-200 p-4">
              <PostExcerpt post={post} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getPost(`${params.slug}.md`);

  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const preparedPosts = posts
    .map((post) => ({ ...post, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .filter((p) => p?.slug !== post?.slug)
    .filter((p) => p?.category === post?.category)
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, sort, ...post }) => ({ ...post }))
    .slice(0, 10);

  return {
    props: { post, posts: preparedPosts },
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

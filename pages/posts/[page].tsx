import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Meta } from "../../components/Meta";
import { Pagination } from "../../components/Pagination";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { TPost } from "../../types/Post";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

interface Props {
  posts: TPost[];
  currentPage: number;
  totalPages: number;
}

export default function Posts({ posts, totalPages }: Props) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      {posts.map((post, i: number) => {
        return (
          <Link href={`/p/${post.slug}`} key={i}>
            <a className="pointer block border-b border-gray-200 p-4">
              <PostExcerpt post={post} />
            </a>
          </Link>
        );
      })}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const length = posts.length;
  const numberOfPages = Math.floor(length / 10);
  const paths = Array.from({ length: numberOfPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
  }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const page = Number(params?.page as string) || 1;
  const length = posts.length;
  const numberOfPages = Math.floor(length / 10);

  const preparedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => ({ ...post }))
    .slice(page, page + 10);

  return {
    props: {
      posts: preparedPosts,
      currentPage: page,
      totalPages: numberOfPages,
    },
  };
};

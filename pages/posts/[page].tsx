import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Meta } from "../../components/Meta";
import { Pagination } from "../../components/Pagination";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";
import { getPosts, PageInfo } from "../../utils/orderPosts";

export default function Posts({ data, totalPages }: PageInfo) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      {data.map((post, i: number) => {
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
  const page = Number(params?.page as string);
  const props = await getPosts({
    page,
  });

  return {
    props,
  };
};

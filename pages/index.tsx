import { GetStaticProps } from "next";
import Link from "next/link";
import { LinkButton } from "../components/LinkButton";
import { Meta } from "../components/Meta";
import { GridPostExcerpt } from "../components/Post/GridPostExcerpt";
import { TPost } from "../types/Post";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

export default function Home({ posts }: { posts: TPost[] }) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      {/* <div className="border-b border-gray-200 p-4 uppercase font-bold text-lg text-gray-500">
        Latest articles
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {posts.map((post, i: number) => (
          <Link href={`/p/${post.slug}`} key={i}>
            <a>
              <GridPostExcerpt post={post} />
            </a>
          </Link>
        ))}
      </div>
      {/* <div className="flex justify-center py-5">
        <LinkButton href="/posts/2">See more</LinkButton>
      </div> */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = [];
  const defaultPageNumber = 1;
  const length = posts.length;
  const numberOfPages = Math.floor(length / 10);

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const preparedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => ({ ...post }))
    .slice(defaultPageNumber, defaultPageNumber + 28);

  return {
    props: {
      posts: preparedPosts,
      currentPage: defaultPageNumber,
      totalPages: numberOfPages,
    },
  };
};

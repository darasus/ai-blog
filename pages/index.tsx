import { GetStaticProps } from "next";
import Link from "next/link";
import { Meta } from "../components/Meta";
import { Post } from "../types/Post";
import { capitalize } from "../utils/capitalize";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Reader are carefully crafter by GPT-3."
      />
      {posts.map(
        ({ title, createdAt, slug, description, category }, i: number) => (
          <Link href={`/p/${slug}`} key={i}>
            <a className="pointer">
              <div className="border-b border-gray-200 p-4">
                <span className="text-gray-400 text-xs">{createdAt}</span>
                {category && (
                  <>
                    <span className="text-gray-400 text-xs">{` • `}</span>
                    <span className="text-gray-400 text-xs">
                      {capitalize(category)}
                    </span>
                  </>
                )}
                <h2>{`${title}`}</h2>
                <span>{description}</span>
              </div>
            </a>
          </Link>
        )
      )}
      <div className="flex justify-center py-5">
        <Link href="/posts/2">
          <a className="py-2 px-3 border rounded border-gray-300 bg-gray-200 hover:border-gray-400 hover:bg-gray-300">
            See more
          </a>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = [];
  const page = 1;
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
    .slice(page, page + 10);

  return {
    props: {
      posts: preparedPosts,
      currentPage: page,
      totalPages: numberOfPages,
    },
  };
};

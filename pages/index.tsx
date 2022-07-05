import Head from "next/head";
import Link from "next/link";
import { Meta } from "../components/Meta";
import { Post } from "../types/Post";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Reader are carefully crafter by GPT-3."
      />
      {posts.map(({ title, createdAt, slug, description }, i: number) => (
        <Link href={`/p/${slug}`} key={i}>
          <a className="pointer">
            <div className="border-b border-gray-200 p-4">
              <span className="text-gray-400 text-xs">{createdAt}</span>
              <h2>{`${title}`}</h2>
              <span>{description}</span>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  return { props: { posts } };
}

import Link from "next/link";
import { Post } from "../types/Post";
import { getPost } from "../utils/getPost";
import { postFilePaths } from "../utils/mdxUtils";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map(({ title, createdAt, slug }, i: number) => (
        <Link href={`/p/${slug}`} key={i}>
          <a className="pointer">
            <div className="border-b border-gray-200 p-4">
              <span className="text-gray-400 text-sm">{createdAt}</span>
              <h2>{`${title}`}</h2>
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

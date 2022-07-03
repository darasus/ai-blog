import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { postFilePaths, getPost } from "../utils/mdxUtils";

export default function Home({ posts }: any) {
  return (
    <>
      {posts.map(({ title, date, slug }: any, i: number) => (
        <Link href={`/p/${slug}`} key={i}>
          <a className="pointer">
            <div className="mb-5 border border-gray-300 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">{date}</span>
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

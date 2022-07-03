import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { postFilePaths, getPost } from "../utils/mdxUtils";

export default function Home({ posts }: any) {
  return (
    <>
      {posts.map(({ title, content, slug }: any, i: number) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <Link href={`/p/${slug}`}>
            <a>
              <h2>
                <b>{title}</b>
              </h2>
            </a>
          </Link>
          <MDXRemote {...content} />
        </div>
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

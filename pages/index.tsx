import { GetStaticProps } from "next";
import Link from "next/link";
import { LinkButton } from "../components/LinkButton";
import { Meta } from "../components/Meta";
import { PostExcerpt } from "../components/Post/PostExcerpt";
import { getPosts, PageInfo } from "../utils/getPosts";

export default function Home({ data }: PageInfo) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      <div className="border-b p-4 uppercase font-bold text-lg text-gray-500">
        Latest articles
      </div>
      {data.map((post, i: number) => {
        return (
          <Link href={`/p/${post.slug}`} key={i}>
            <a className="pointer block border-b border-gray-200 p-4">
              <PostExcerpt post={post} />
            </a>
          </Link>
        );
      })}
      <div className="flex justify-center py-5">
        <LinkButton href="/posts/2">See more</LinkButton>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props = await getPosts({
    page: 1,
  });

  return {
    props,
  };
};

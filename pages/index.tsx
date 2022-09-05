import { GetStaticProps } from "next";
import { LinkButton } from "../components/LinkButton";
import { Meta } from "../components/Meta";
import { GridPostExcerpt } from "../components/Post/GridPostExcerpt";
import { getPosts, PageInfo } from "../utils/orderPosts";

export default function Home({ data }: PageInfo) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      <div className="p-4 uppercase font-bold text-lg text-gray-500">
        Latest articles
      </div>
      <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg xl:masonry-xl">
        {data.map((post, i: number) => (
          <GridPostExcerpt key={post.slug} post={post} />
        ))}
      </div>
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

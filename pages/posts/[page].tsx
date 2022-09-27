import { Divider } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Link } from "../../components/Link";
import { Meta } from "../../components/Meta";
import { Pagination } from "../../components/Pagination";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { getPosts, PageInfo } from "../../utils/getPosts";

export default function Posts({ data, totalPages }: PageInfo) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      {data.map((post, i: number) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={i}>
            <PostExcerpt post={post} />
            <Divider />
          </Link>
        );
      })}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { totalPages } = await getPosts({
    page: 1,
  });
  const paths = Array.from({ length: totalPages }).map((_, i) => ({
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

import { Box, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { Link } from "../components/Link";
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
      <Box
        borderBottomWidth={"1px"}
        p={4}
        textTransform={"uppercase"}
        fontWeight="bold"
      >
        Latest articles
      </Box>
      {data.map((post, i: number) => {
        return (
          <Link href={`/p/${post.slug}`} key={i}>
            <PostExcerpt post={post} />
          </Link>
        );
      })}
      <Flex justifyContent={"center"} py={5}>
        <Link href="/posts/2">See more</Link>
      </Flex>
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

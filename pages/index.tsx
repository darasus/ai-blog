import { Box, Divider, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { Link } from "../components/Link";
import { LinkButton } from "../components/LinkButton";
import { Meta } from "../components/Meta";
import { PostExcerpt } from "../components/Post/PostExcerpt";
import { PostListSection } from "../components/Post/PostListSection";
import { getPosts, PageInfo } from "../node-utils/getPosts";
import { Locale } from "../types";

export default function Home({ data }: PageInfo) {
  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Paper are carefully crafted by GPT-3"
      />
      <PostListSection title={"Latest articles"} posts={data} />
      <Flex justifyContent={"center"} py={5}>
        <LinkButton href="/posts/2">See more</LinkButton>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const props = await getPosts({
    locale: ctx.locale as Locale,
    page: 1,
  });

  return {
    props,
  };
};

import { Box, Divider, Text } from "@chakra-ui/react";
import { Meta } from "../../components/Meta";
import { DetailedPost } from "../../components/Post/DetailedPost";
import { PostListSection } from "../../components/Post/PostListSection";
import { Locale, Post } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { getPost } from "../../node-utils/getPost";
import { getPosts, PageInfo } from "../../node-utils/getPosts";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { generatePostPageStaticPaths } from "../../node-utils/generateStaticPaths";

interface Props extends PageInfo {
  post: Post;
}

export default function Home({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box p={4}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  const { title, content, createdAt, summary, category, slug } = post;
  return (
    <>
      <Meta
        title={title}
        description={`${summary.slice(0, 157).trim()}...`}
        imageSrc={post.imageSrc}
        slug={slug}
        structured={{
          ...(post.imageSrc
            ? { image: [`https://www.theaipaper.com${post.imageSrc}`] }
            : {}),
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
        }}
      />
      <DetailedPost post={post} />
      <Divider />
      {/* <PostListSection
        title={`Other in ${capitalize(category)}`}
        posts={data}
      /> */}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // paths: [],
    paths: await generatePostPageStaticPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPost(ctx.params?.slug as string);

  if (!post) return { notFound: true };

  // const posts = await getPosts({
  //   locale: ctx.locale as Locale,
  //   category: post?.category,
  //   excludeBySlug: [post?.slug],
  //   order: "random",
  //   numberOfItems: 10,
  // });

  return {
    props: { post },
    revalidate: 60,
  };
};

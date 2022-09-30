import { Box, Divider, Text } from "@chakra-ui/react";
import { Meta } from "../../components/Meta";
import { Post } from "../../components/Post/Post";
import { PostListSection } from "../../components/Post/PostListSection";
import { Locale, TPost } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { getPost } from "../../node-utils/getPost";
import { getPosts, PageInfo } from "../../node-utils/getPosts";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props extends PageInfo {
  post: TPost;
}

export default function Home({ post, data }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box p={4}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  const { title, summary, category, slug } = post;

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
      <Post post={post} />
      <Divider />
      <PostListSection
        title={`Other in ${capitalize(category)}`}
        posts={data}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const post = await getPost(ctx.params?.slug as string);

    if (!post) return { props: { notFound: false } };

    const posts = await getPosts({
      locale: ctx.locale as Locale,
      category: post?.category,
      excludeBySlug: [post?.slug],
      order: "random",
      numberOfItems: 10,
    });

    return {
      props: { post, ...posts },
    };
  } catch (error) {
    return { notFound: true };
  }
};

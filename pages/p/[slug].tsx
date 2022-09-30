import { Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { Meta } from "../../components/Meta";
import { Post } from "../../components/Post/Post";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { PostListSection } from "../../components/Post/PostListSection";
import { TPost } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { getPost } from "../../node-utils/getPost";
import { getPosts, PageInfo } from "../../node-utils/getPosts";
import { postFilePaths } from "../../node-utils/postFilePaths";

interface Props extends PageInfo {
  post: TPost;
}

export default function Home({ post, data }: Props) {
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
      <Post post={post} />
      <Divider />
      <PostListSection
        title={`Other in ${capitalize(category)}`}
        posts={data}
      />
    </>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getPost(params.slug);

  if (!post) return { props: {} };

  const posts = await getPosts({
    locale: "en",
    category: post?.category,
    excludeBySlug: [post?.slug],
    order: "random",
    numberOfItems: 10,
  });

  return {
    props: { post, ...posts },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.md?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

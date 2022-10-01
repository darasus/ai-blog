import { Divider } from "@chakra-ui/react";
import { Meta } from "../../components/Meta";
import { DetailedPost } from "../../components/Post/DetailedPost";
import { PostListSection } from "../../components/Post/PostListSection";
import { Locale, Post } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { getPost } from "../../node-utils/getPost";
import { PageInfo } from "../../node-utils/getPosts";
import { GetStaticPaths, GetStaticProps } from "next";
import { generatePostPageStaticPaths } from "../../node-utils/generateStaticPaths";
import { useIntl } from "react-intl";
import { loadIntlMessages } from "../../isomorphic-utils/loadIntlMessages";

interface Props extends PageInfo {
  post: Post;
}

export default function Home({ post }: Props) {
  const intl = useIntl();
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
      <DetailedPost post={post} />
      <Divider />
      <PostListSection
        title={intl.formatMessage(
          {
            defaultMessage: "Other in {category}",
          },
          { category: capitalize(category) }
        )}
        posts={post.relatedArticles}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await generatePostPageStaticPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale;
  const defaultLocale = ctx.defaultLocale as Locale;
  const post = await getPost(ctx.params?.slug as string);

  if (!post) return { notFound: true };

  return {
    props: {
      post,
      intlMessages: await loadIntlMessages(locale, defaultLocale),
    },
  };
};

import { Divider } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Link } from "../../components/Link";
import { Meta } from "../../components/Meta";
import { Pagination } from "../../components/Pagination";
import { PostExcerpt } from "../../components/Post/PostExcerpt";
import { loadIntlMessages } from "../../isomorphic-utils/loadIntlMessages";
import { generatePostsPageStaticPaths } from "../../node-utils/generateStaticPaths";
import { getPosts, PageInfo } from "../../node-utils/getPosts";
import { Locale } from "../../types";

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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: await generatePostsPageStaticPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale;
  const defaultLocale = ctx.defaultLocale as Locale;
  const page = Number(ctx.params?.page as string);
  const props = await getPosts({
    locale,
    page,
  });

  return {
    props: {
      ...props,
      intlMessages: await loadIntlMessages(locale, defaultLocale),
    },
  };
};

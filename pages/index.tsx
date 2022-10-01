import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useIntl } from "react-intl";
import { LinkButton } from "../components/LinkButton";
import { Meta } from "../components/Meta";
import { PostListSection } from "../components/Post/PostListSection";
import { loadIntlMessages } from "../isomorphic-utils/loadIntlMessages";
import { getPosts, PageInfo } from "../node-utils/getPosts";
import { Locale } from "../types";

export default function Home({ data }: PageInfo) {
  const intl = useIntl();

  return (
    <>
      <Meta
        title={intl.formatMessage({
          defaultMessage: "Latest",
        })}
        description={intl.formatMessage({
          defaultMessage:
            'All materials from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.',
        })}
      />
      <PostListSection
        title={intl.formatMessage({
          defaultMessage: "Latest articles",
        })}
        posts={data}
      />
      <Flex justifyContent={"center"} py={5}>
        <LinkButton href="/posts/2">
          {intl.formatMessage({
            defaultMessage: "See more",
          })}
        </LinkButton>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale;
  const defaultLocale = ctx.defaultLocale as Locale;
  const props = await getPosts({
    locale,
    page: 1,
  });

  return {
    props: {
      ...props,
      intlMessages: await loadIntlMessages(locale, defaultLocale),
    },
  };
};

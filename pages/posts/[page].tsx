import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinkButton } from "../../components/LinkButton";
import { Meta } from "../../components/Meta";
import { Pagination } from "../../components/Pagination";
import { Post } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { getPost } from "../../utils/getPost";
import { postFilePaths } from "../../utils/mdxUtils";

interface Props {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function Posts({ posts, totalPages }: Props) {
  const router = useRouter();

  return (
    <>
      <Meta
        title="Latest"
        description="All articles from The AI Reader are carefully crafter by GPT-3."
      />
      {posts.map(
        ({ title, createdAt, slug, description, category }, i: number) => {
          return (
            <Link href={`/p/${slug}`} key={i}>
              <a className="pointer">
                <div className="border-b border-gray-200 p-4">
                  <span className="text-gray-400 text-xs">{createdAt}</span>
                  {category && (
                    <>
                      <span className="text-gray-400 text-xs">{` • `}</span>
                      <span className="text-gray-400 text-xs">
                        {capitalize(category)}
                      </span>
                    </>
                  )}
                  <h2>{`${title}`}</h2>
                  <span>{description}</span>
                </div>
              </a>
            </Link>
          );
        }
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const length = posts.length;
  const numberOfPages = Math.floor(length / 10);
  const paths = Array.from({ length: numberOfPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
  }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    posts.push(post);
  }

  const page = Number(params?.page as string) || 1;
  const length = posts.length;
  const numberOfPages = Math.floor(length / 10);

  const preparedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => ({ ...post }))
    .slice(page, page + 10);

  return {
    props: {
      posts: preparedPosts,
      currentPage: page,
      totalPages: numberOfPages,
    },
  };
};

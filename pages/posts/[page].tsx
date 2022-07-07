import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Meta } from "../../components/Meta";
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
      <div className="flex justify-center py-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link key={i} href={`/posts/${i + 1}`}>
            <a className="py-2 px-3 border rounded border-gray-300 bg-gray-200 hover:border-gray-400 hover:bg-gray-300 mr-1 last:mr-0">
              {i + 1}
            </a>
          </Link>
        ))}
      </div>
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

  return {
    props: {
      posts: posts.slice(page, page + 10),
      currentPage: page,
      totalPages: numberOfPages,
    },
  };
};

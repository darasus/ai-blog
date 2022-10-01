import { Box, Divider } from "@chakra-ui/react";
import { Post, BasePost } from "../../types";
import { Link } from "../Link";
import { PostExcerpt } from "./PostExcerpt";

interface Props {
  posts: BasePost[];
  title?: string;
}

export function PostListSection({ posts, title }: Props) {
  return (
    <>
      {title && (
        <Box
          borderBottomWidth={"1px"}
          p={4}
          textTransform={"uppercase"}
          fontWeight="bold"
          borderColor={"gray.100"}
        >
          {title}
        </Box>
      )}
      {posts.map((post, i: number) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={i}>
            <PostExcerpt post={post} />
            <Divider />
          </Link>
        );
      })}
    </>
  );
}

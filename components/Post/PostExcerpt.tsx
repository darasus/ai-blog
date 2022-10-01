import { Box, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/future/image";
import React from "react";
import { Post, BasePost } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { Markdown } from "../Markdown";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: BasePost;
}

export function PostExcerpt({ post }: Props) {
  const { createdAt, categoryLocal, title, intro, imageSrc, imageSrcBase64 } =
    post;

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
      gap={5}
      p={4}
    >
      <GridItem colSpan={1}>
        <Image
          blurDataURL={imageSrcBase64}
          src={imageSrc}
          height={800}
          width={800}
          alt={title}
          placeholder="blur"
        />
      </GridItem>
      <GridItem colSpan={1}>
        <PostMeta items={[createdAt, capitalize(categoryLocal)]} />
        <PostTitle type="h2">{`${title}`}</PostTitle>
        <Box px={"1"}>
          <Markdown {...intro} />
        </Box>
      </GridItem>
    </Grid>
  );
}

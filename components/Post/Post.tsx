import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/future/image";
import React from "react";
import { TPost } from "../../types";
import { capitalize } from "../../isomorphic-utils/capitalize";
import { Markdown } from "../Markdown";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export function Post({ post }: Props) {
  const {
    createdAt,
    title,
    category,
    intro,
    content,
    summary,
    imageSrc,
    imageSrcBase64,
  } = post;

  return (
    <article>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={4}
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
            priority
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Flex
            h={"full"}
            alignItems={"start"}
            justifyContent="center"
            flexDirection="column"
          >
            <PostMeta items={[createdAt, capitalize(category)]} />
            <PostTitle>{title}</PostTitle>
          </Flex>
        </GridItem>
      </Grid>
      <Divider />
      <Box borderLeftWidth={4} px={4} m={4}>
        <Text
          as="span"
          fontSize={"2xl"}
          color="gray.700"
          fontWeight={"bold"}
          fontStyle={"italic"}
          lineHeight="1.2"
        >{`TL;DR: `}</Text>
        <Text
          fontSize={"2xl"}
          color="gray.700"
          as="span"
          fontStyle={"italic"}
          lineHeight="1.2"
        >
          {summary}
        </Text>
      </Box>
      <Divider />
      <Box p={4}>
        <Markdown {...intro} />
        <Markdown {...content} />
      </Box>
    </article>
  );
}

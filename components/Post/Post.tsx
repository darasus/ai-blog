import { Box, Flex, Text } from "@chakra-ui/react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/future/image";
import React from "react";
import { TPost } from "../../types";
import { capitalize } from "../../utils/capitalize";
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
      <Flex mb={4}>
        <Image
          blurDataURL={imageSrcBase64}
          src={imageSrc}
          height={500}
          width={500}
          alt={title}
          placeholder="blur"
          priority
        />
      </Flex>
      <PostMeta items={[createdAt, capitalize(category)]} />
      <PostTitle>{title}</PostTitle>
      <Box borderLeftWidth={4} pl={4} my={4}>
        <Text
          as="span"
          fontSize={"2xl"}
          color="gray.500"
          fontWeight={"bold"}
        >{`TL;DR: `}</Text>
        <Text fontSize={"2xl"} color="gray.500" as="span">
          {summary}
        </Text>
      </Box>
      <MDXRemote {...intro} />
      <MDXRemote {...content} />
    </article>
  );
}

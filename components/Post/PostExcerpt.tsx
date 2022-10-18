import { AspectRatio, Box, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/future/image'
import React from 'react'
import { BasePost } from '../../types'
import { Markdown } from '../Markdown'
import { PostMeta } from './PostMeta'
import { PostTitle } from './PostTitle'

interface Props {
  post: BasePost
}

export function PostExcerpt({ post }: Props) {
  const { createdAt, categoryLocal, title, intro, imageSrc, imageSrcBase64 } =
    post

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
      gap={5}
      p={4}
    >
      <GridItem colSpan={1}>
        <AspectRatio position="relative" ratio={1}>
          <Image
            blurDataURL={imageSrcBase64}
            src={imageSrc}
            alt={title}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio>
      </GridItem>
      <GridItem colSpan={1}>
        <PostMeta category={categoryLocal} date={createdAt} />
        <PostTitle type="h2">{`${title}`}</PostTitle>
        <Box px={'1'}>
          <Markdown {...intro} />
        </Box>
      </GridItem>
    </Grid>
  )
}

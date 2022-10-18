import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Category } from '../../types'

interface Props {
  date: string
  category: string
}

export const PostMeta: React.FC<Props> = ({ date, category }) => {
  return (
    <Flex alignItems={'center'}>
      <Badge mr={2}>{category}</Badge>
      <Text
        color="gray.700"
        fontSize="xs"
        textTransform={'uppercase'}
        fontWeight="bold"
      >
        {date}
      </Text>
    </Flex>
  )
}

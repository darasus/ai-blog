import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { LinkButton } from './LinkButton'

interface Props {
  totalPages: number
}

export const Pagination: React.FC<Props> = ({ totalPages }) => {
  const router = useRouter()
  const currentPage = Number(router.query.page)

  return (
    <Flex bg={'white'} p={4} alignItems="center">
      <Flex flexGrow={'1'}>
        {currentPage !== 1 && (
          <LinkButton href={`/posts/${currentPage - 1}`}>Previous</LinkButton>
        )}
        <Box flexGrow={1} />
        {currentPage !== totalPages && (
          <LinkButton href={`/posts/${currentPage + 1}`}>Next</LinkButton>
        )}
      </Flex>
    </Flex>
  )
}

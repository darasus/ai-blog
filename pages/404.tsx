import { Box, Flex, Text } from '@chakra-ui/react'
import { NoSymbolIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <Flex direction={'column'} p={4} alignItems="center">
      <Box mb={4}>
        <NoSymbolIcon width={100} height={100} />
      </Box>
      <Text>Opps... Something went wrong.</Text>
    </Flex>
  )
}

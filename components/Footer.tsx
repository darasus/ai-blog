import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from './Link'

export const Footer = () => {
  return (
    <Flex justifyContent={'center'} alignItems="center" w="full" p={4}>
      <Text
        color="gray.700"
        fontSize={'sm'}
      >{`The AI Paper © ${new Date().getFullYear()}`}</Text>
      <Box mr={4} />
      <Link href="/" locale="en">
        <Text
          textTransform={'capitalize'}
          color="gray.700"
          fontSize={'sm'}
          textDecor="underline"
        >
          {new Intl.DisplayNames(['en'], { type: 'language' }).of('en')}
        </Text>
      </Link>
      <Box mr={4} />
      <Link href="/" locale="es">
        <Text
          textTransform={'capitalize'}
          color="gray.700"
          fontSize={'sm'}
          textDecor="underline"
        >
          {new Intl.DisplayNames(['es'], { type: 'language' }).of('es')}
        </Text>
      </Link>
    </Flex>
  )
}

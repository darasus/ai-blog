import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = React.PropsWithChildren<{}>;

export function Layout({ children }: Props) {
  return (
    <Flex bg="gray.100" minH="100vh" direction="column">
      <Box bg="gray.900">
        <Box px="4" maxW="6xl" m="0 auto">
          <Box>
            <Navbar />
          </Box>
        </Box>
      </Box>
      <Box mb="4" mt="4">
        <Flex
          maxW="6xl"
          m="0 auto"
          p="4"
          bg="white"
          borderColor={"gray.200"}
          borderWidth="1px"
          alignItems={"center"}
        >
          <Box mr={2}>
            <Text color="yellow.300">
              <ExclamationTriangleIcon width={22} height={22} />
            </Text>
          </Box>
          <Box>
            <Text color="gray.700">{`All articles from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.`}</Text>
          </Box>
        </Flex>
      </Box>
      <Box
        maxW="6xl"
        m="0 auto"
        bg="white"
        borderWidth={"1px"}
        borderColor="gray.200"
      >
        <main>{children}</main>
      </Box>
      <Flex alignItems={"center"}>
        <Footer />
      </Flex>
    </Flex>
  );
}

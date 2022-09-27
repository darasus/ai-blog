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
        <Box
          maxW="6xl"
          m="0 auto"
          p="4"
          bg="yellow.500"
          borderColor={"yellow.600"}
          borderWidth="1px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "1.5rem",
              width: "1.5rem",
              display: "inline-block",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <Text
            colorScheme={"whiteAlpha"}
          >{`All articles from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.`}</Text>
        </Box>
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

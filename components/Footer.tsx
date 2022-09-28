import { Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex justifyContent={"center"} alignItems="center" w="full" p={4}>
      <Text
        color="gray.700"
        fontSize={"sm"}
      >{`The AI Paper © ${new Date().getFullYear()}`}</Text>
    </Flex>
  );
};

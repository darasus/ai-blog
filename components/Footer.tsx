import { Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex justifyItems={"center"}>
      <Text
        color="gray.400"
        fontSize={"sm"}
      >{`The AI Paper © ${new Date().getFullYear()}`}</Text>
    </Flex>
  );
};

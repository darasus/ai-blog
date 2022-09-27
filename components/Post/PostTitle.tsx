import { Text } from "@chakra-ui/react";
import React from "react";

type Props = React.PropsWithChildren<{
  type?: "h1" | "h2";
}>;

const sizeMap = {
  h1: "6xl",
  h2: "4xl",
};

export const PostTitle: React.FC<Props> = ({ type = "h1", children }) => {
  return (
    <Text as={type} mt={1} mb={2} fontSize={sizeMap[type]} fontWeight="bold">
      {children}
    </Text>
  );
};

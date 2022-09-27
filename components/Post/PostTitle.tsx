import { Text } from "@chakra-ui/react";
import React from "react";
import { headingSizeMap } from "../../theme";

type Props = React.PropsWithChildren<{
  type?: "h1" | "h2";
}>;

export const PostTitle: React.FC<Props> = ({ type = "h1", children }) => {
  return (
    <Text
      as={type}
      mt={1}
      mb={2}
      fontSize={headingSizeMap[type]}
      fontWeight="bold"
      lineHeight={1}
    >
      {children}
    </Text>
  );
};

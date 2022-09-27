import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  items: string[];
}

export const PostMeta: React.FC<Props> = ({ items }) => {
  return (
    <Text color="gray.400" fontSize="xs">
      {items.join(" • ")}
    </Text>
  );
};

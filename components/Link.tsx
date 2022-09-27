import NextLink, { LinkProps } from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";

type Props = React.PropsWithChildren<LinkProps>;

export function Link({ children, ...props }: Props) {
  return (
    <NextLink {...props}>
      <ChakraLink>{children}</ChakraLink>
    </NextLink>
  );
}

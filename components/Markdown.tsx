import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MDXRemote } from "next-mdx-remote";
import * as mdx from "@mdx-js/react";
import { headingSizeMap } from "../theme";
import {
  ArrowSmallRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

type Props = any;

type Components = React.ComponentProps<typeof mdx.MDXProvider>["components"];

const components: Components = {
  h1: (props) => (
    <Text
      as="h1"
      fontWeight={"bold"}
      fontSize={headingSizeMap["h1"]}
      lineHeight={1}
      {...props}
    />
  ),
  h2: (props) => (
    <Text
      as="h2"
      fontWeight={"bold"}
      mt={4}
      fontSize={headingSizeMap["h2"]}
      lineHeight={1}
      {...props}
    />
  ),
  h3: (props) => (
    <Text
      as="h3"
      fontWeight={"bold"}
      mt={4}
      fontSize={headingSizeMap["h3"]}
      lineHeight={1}
      {...props}
    />
  ),
  h4: (props) => (
    <Text
      as="h4"
      fontWeight={"bold"}
      mt={4}
      fontSize={headingSizeMap["h4"]}
      lineHeight={1}
      {...props}
    />
  ),
  p: (props) => <Text {...props} my={2} fontSize={"lg"} />,
  ul: (props) => <List spacing={3} {...props} />,
  li: (props) => (
    <ListItem {...props}>
      <ListIcon
        as={ChevronDoubleRightIcon}
        w={5}
        h={5}
        color="gray.500"
        mr={1}
      />
      <Text as="span" fontSize={"lg"}>
        {props.children}
      </Text>
    </ListItem>
  ),
};

export function Markdown(props: Props) {
  return <MDXRemote {...props} components={components} />;
}

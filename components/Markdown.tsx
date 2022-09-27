import { Text } from "@chakra-ui/react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import * as mdx from "@mdx-js/react";
import { headingSizeMap } from "../theme";

type Props = MDXRemoteProps;

type Components = React.ComponentProps<typeof mdx.MDXProvider>["components"];

const components: Components = {
  h1: (props) => (
    <Text
      as="h1"
      fontWeight={"bold"}
      fontSize={headingSizeMap["h1"]}
      {...props}
    />
  ),
  h2: (props) => (
    <Text
      as="h2"
      fontWeight={"bold"}
      fontSize={headingSizeMap["h2"]}
      {...props}
    />
  ),
  h3: (props) => (
    <Text
      as="h3"
      fontWeight={"bold"}
      fontSize={headingSizeMap["h3"]}
      {...props}
    />
  ),
  h4: (props) => (
    <Text
      as="h4"
      fontWeight={"bold"}
      fontSize={headingSizeMap["h4"]}
      {...props}
    />
  ),
  p: (props) => <Text {...props} py={2} fontSize={"lg"} />,
};

export function Markdown(props: Props) {
  return <MDXRemote {...props} components={components} />;
}

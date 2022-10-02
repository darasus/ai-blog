import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useIntl } from "react-intl";
import { data } from "../data/data";
import { Link } from "./Link";
import { Category } from "../types";
import { useRouter } from "next/router";

type Props = React.PropsWithChildren<{}>;

export function Layout({ children }: Props) {
  const router = useRouter();
  const intl = useIntl();

  const categoryLabel: Record<
    Category,
    ReturnType<typeof intl.formatMessage>
  > = {
    politics: intl.formatMessage({
      id: "category.politics",
      defaultMessage: "Politics",
    }),
    business: intl.formatMessage({
      id: "category.business",
      defaultMessage: "Business",
    }),
    investing: intl.formatMessage({
      id: "category.investing",
      defaultMessage: "Investing",
    }),
    productivity: intl.formatMessage({
      id: "category.productivity",
      defaultMessage: "Productivity",
    }),
    technology: intl.formatMessage({
      id: "category.technology",
      defaultMessage: "Technology",
    }),
    crypto: intl.formatMessage({
      id: "category.crypto",
      defaultMessage: "Crypto",
    }),
    coding: intl.formatMessage({
      id: "category.coding",
      defaultMessage: "Coding",
    }),
    gaming: intl.formatMessage({
      id: "category.gaming",
      defaultMessage: "Gaming",
    }),
    health: intl.formatMessage({
      id: "category.health",
      defaultMessage: "Health",
    }),
    culture: intl.formatMessage({
      id: "category.culture",
      defaultMessage: "Culture",
    }),
    cooking: intl.formatMessage({
      id: "category.cooking",
      defaultMessage: "Cooking",
    }),
    life: intl.formatMessage({
      id: "category.life",
      defaultMessage: "Life",
    }),
  };

  return (
    <Flex bg="gray.100" minH="100vh" direction="column">
      <Box bg="gray.900">
        <Box px="4" maxW="6xl" m="0 auto">
          <Box>
            <Navbar />
          </Box>
        </Box>
      </Box>
      <Box bg="white" py={2} borderColor={"gray.200"} borderBottomWidth="1px">
        <Box maxW="6xl" m="0 auto">
          <Stack spacing={2} overflowX={"auto"} direction="row" px={2}>
            {Object.keys(categoryLabel).map((c, i) => {
              const isActive = router.query.category === c;
              return (
                <Box key={i}>
                  <Link href={`/category/${c}/1`} hoverStyles={false}>
                    <Button
                      size="sm"
                      as="span"
                      variant={"solid"}
                      colorScheme={isActive ? "purple" : undefined}
                    >
                      {categoryLabel[c as Category]}
                    </Button>
                  </Link>
                </Box>
              );
            })}
          </Stack>
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
            <Text color="gray.700">
              {intl.formatMessage({
                defaultMessage: `All articles from "The AI Paper" are carefully crafted by advanced Artificial Intelligence models and should not be taken as truth.`,
              })}
            </Text>
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

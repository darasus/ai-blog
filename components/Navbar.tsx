import Link from "next/link";
import Image from "next/future/image";
import { Flex } from "@chakra-ui/react";

export function Navbar() {
  return (
    <Flex py={4} cursor="pointer">
      <Link href="/">
        <a>
          <Image src={"/logo.svg"} width={154} height={30.8} alt="logo" />
        </a>
      </Link>
      <Link href="/" locale="en">
        en
      </Link>
      <Link href="/" locale="es">
        es
      </Link>
    </Flex>
  );
}

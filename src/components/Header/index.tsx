import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex as="header" boxShadow="lg">
      <Heading as="h1">Dev Shop</Heading>
      <Flex as="ul">
        <li>
          <Link href="/">Caregorias</Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Sobre Nós</Link>
        </li>
      </Flex>
    </Flex>
  );
};

export default Header;

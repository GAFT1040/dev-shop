"use client";
import {
  Center,
  Group,
  Heading,
  Input,
  Button,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  const [state, setState] = useState();
  return (
    <Center flexDir="column">
      <Heading pt="2rem">Bem vindo ao DevShop</Heading>
      <Group attached w="4xl" mt="2rem ">
        <Input placeholder="Busque por..." />
        <Button bg="bg.subtle" variant="outline">
          <IoIosSearch />
        </Button>
      </Group>
      <Box w="60%" h="500px" bg="gray.600" mt="2rem"></Box>

      <Box mt="3rem">
        <Heading textAlign="center" mb="2rem">
          Categorias
        </Heading>
        <Flex gap="2rem">
          {["Roupas", "Periféricos", "Utensílios"].map((item, index) => (
            <Box key={index} textAlign="center">
              <Box w="100px" h="100px" bg="gray.300" borderRadius="full"></Box>
              <Text> {item} </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Center>
  );
}

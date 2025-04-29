"use client";
import ProductsCard from "@/components/ProductsCard";
import { getCategories, getProducts } from "@/services/products.service";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import {
  Center,
  Group,
  Heading,
  Input,
  Button,
  Box,
  Flex,
  Text,
  Image,
  Link as ChakraLink,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]); //estado do componente
  const [products, setProducts] = useState<Product[]>([]); //estado do componente

  const fetchCategories = async () => {
    const categoriesData = await getCategories();
    setCategories(categoriesData);
  };

  const fetchProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

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
      <Image w="60%" h="500px" bg="gray.600" mt="2rem" src="/banner.png" />

      <Box mt="3rem" w="60%">
        {/* <Heading mb="2rem">Categorias</Heading> */}

        <Flex gap="2rem">
          {categories?.map((item, index) => (
            <ChakraLink
              as={Link}
              href="/"
              key={index}
              textAlign="center"
              flexDir="column"
            >
              <Box w="150px" h="200px" bg="gray.300" borderRadius="md"></Box>
              <Text> {item.category_name} </Text>
            </ChakraLink>
          ))}
        </Flex>
      </Box>
      <Box w="60%" mt="2rem">
        <Heading mb="2rem">Produtos</Heading>
        <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
          {products?.map((product, index) => (
            <ProductsCard key={product.name} {...product} />
          ))}
        </Grid>
      </Box>
    </Center>
  );
}

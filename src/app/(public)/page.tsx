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
  const [productFilter, setProductFilter] = useState<string>("");

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

  const filterProducts = async () => {
    const response = await getProducts();
    const normalizeFilter = productFilter
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const newProductsList = response.filter((item: Product) =>
      item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizeFilter)
    );
    setProducts(newProductsList);
  };

  useEffect(() => {
    filterProducts();
  }, [productFilter]);

  const [state, setState] = useState();
  return (
    <Center flexDir="column">
      <Heading pt="2rem">Bem vindo ao DevShop</Heading>
      <Group attached w="4xl" mt="2rem ">
        <Input
          placeholder="Busque por..."
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        />
        <Button
          bg="bg.subtle"
          variant="outline"
          onClick={() => setProductFilter((prev) => prev)}
        >
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
              href={`/categories/${item.id}`}
              key={index}
              textAlign="center"
              flexDir="column"
            >
              <Box w="150px" h="200px" overflow="hidden">
                <Image
                  src={item.img_src}
                  w="150px"
                  h="200px"
                  transition="all .3s ease"
                  borderRadius="md"
                  _hover={{ transform: "scale(1.1)" }}
                ></Image>
              </Box>
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

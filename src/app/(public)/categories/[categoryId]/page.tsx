"use client";

import ProductsCard from "@/components/ProductsCard";
import {
  getCategories,
  getProductsByCategory,
} from "@/services/products.service";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Categorys() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const params = useParams();
  const router = useRouter();

  const fetchCategories = async () => {
    const categoriesData = await getCategories();
    setCategories(categoriesData);
  };

  const selectedCategory = params?.categoryId;

  const fetchProducts = async (id: string) => {
    const numberId = Number(id);
    if (isNaN(numberId)) {
      const resp = await getProductsByCategory();
      setProducts(resp);
      return;
    }

    const filteredProdcuts = await getProductsByCategory(id);
    setProducts(filteredProdcuts);
  };

  useEffect(() => {
    fetchProducts(selectedCategory as string);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Flex m="auto">
      <Box w="200px" borderRight="1px solid #414141" p="2rem">
        <Button
          mb="1rem"
          w="100%"
          unstyled
          onClick={() => router.push(`/categories/all`)}
        >
          Todos
        </Button>
        {categories?.map((category) => (
          <Button
            mb="1rem"
            w="100%"
            unstyled
            key={category.id}
            onClick={() => router.push(`/categories/${category.id}`)}
          >
            {category.category_name}
          </Button>
        ))}
      </Box>
      <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3} p="2rem">
        {products?.map((product) => (
          <ProductsCard key={product.name} {...product} />
        ))}
      </Grid>
    </Flex>
  );
}

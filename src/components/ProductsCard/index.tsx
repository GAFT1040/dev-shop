"use client";

import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import React from "react";

const ProductsCard: React.FC<Product> = ({
  img_src,
  value,
  name,
  categori_id,
  id,
}) => {
  const { addToCart } = useCart();

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Box h="350px" bg="white">
        <Image src={img_src} h="350px" alt={name} objectFit="contain" />
      </Box>
      <Card.Body gap="2" py="2">
        <Card.Title> {name} </Card.Title>
      </Card.Body>
      <Card.Footer gap="2" flexDir="column" alignItems="start">
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {value.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
        </Text>
        <Button
          variant="ghost"
          w="100%"
          bg="white"
          color="black"
          onClick={() => addToCart({ img_src, value, name, categori_id, id })}
        >
          Adicionar ao Carrinho
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductsCard;

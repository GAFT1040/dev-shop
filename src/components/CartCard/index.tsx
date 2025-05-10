"use client";

import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

export interface CartCardProps extends Product {
  amount: number;
}

export const CartCard: React.FC<CartCardProps> = ({
  img_src,
  name,
  id,
  category_id,
  value,
  amount,
}) => {
  const { addToCart, removeToCart } = useCart();

  return (
    <Flex gap="1rem">
      <Image
        src={img_src}
        width="70px"
        height="70px"
        alt="asdasd"
        borderRadius="md"
      />
      <Box flex="1">
        <Text>{name}</Text>
        <Text>
          Valor:{" "}
          {(value * amount).toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          })}
        </Text>
        <Flex justify="space-between">
          <Text>Qtd: {amount}</Text>
          <Flex>
            <BiMinus
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => removeToCart(id)}
            />
            <BiPlus
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() =>
                addToCart({ img_src, name, id, category_id, value })
              }
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CartCard;

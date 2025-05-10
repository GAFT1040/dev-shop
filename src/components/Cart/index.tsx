"use client";

import { useCart } from "@/contexts/CartContext";
import {
  Button,
  Center,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  Separator,
  Text,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import CartCard from "../CartCard";

const Cart = () => {
  const { cartList, total, clearCart } = useCart();

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild position="fixed" bottom={0} right={0} m="2rem">
        <Center cursor="pointer">
          <FaShoppingCart size={25} />
        </Center>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Carrinho de compras</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {cartList.length ? (
                cartList.map((item) => <CartCard key={item.id} {...item} />)
              ) : (
                <MdOutlineRemoveShoppingCart
                  size={42}
                  style={{ margin: "auto" }}
                />
              )}
            </Drawer.Body>
            <Drawer.Footer flexDir="column">
              <Flex justify="space-between" w="100%">
                <Text fontSize="1.2rem">Total:</Text>
                <Text fontSize="1.2rem">
                  {total.toLocaleString("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  })}
                </Text>
              </Flex>
              <Button w="100%" mt="1rem">
                Finalizar compra
              </Button>
              <Separator />
              <Button
                w="100%"
                background="red.600"
                color="#fff"
                onClick={clearCart}
              >
                Limpar carrinho
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Cart;

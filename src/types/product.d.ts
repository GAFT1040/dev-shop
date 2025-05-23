export interface Product {
  id: number;
  name: string;
  value: number;
  category_id: number;
  img_src: string;
}

export interface CartContextInterface {
  cartList: CartCardProps[];
  addToCart: (Product) => void;
  removeToCart: (id) => void;
  clearCart: () => void;
  total: number;
}

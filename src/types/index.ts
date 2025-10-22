export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

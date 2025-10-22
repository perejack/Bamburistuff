import { Product } from '../types';

export const cementProducts: Product[] = [
  {
    id: 'bamburi-power-plus-42-5n',
    name: 'Bamburi Power Plus MPa',
    price: 550,
    description: 'High-strength cement for demanding construction projects.',
    image: '/images/Bamburi-PowerMax-1-6.png',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa', 'High-strength']
  },
  {
    id: 'bamburi-tembo-32-5r',
    name: 'Bamburi Tembo MPa',
    price: 620,
    description: 'General purpose cement for all types of construction.',
    image: '/images/image-7-7.jpg',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa', 'General purpose']
  },
  {
    id: 'bamburi-fundi-masonry-cement',
    name: 'Bamburi Fundi Masonry Cement',
    price: 600,
    description: 'Specialized masonry cement for plastering and blockwork.',
    image: '/images/64326255bda4a-8.webp',
    category: 'cement',
    tags: ['Cement', 'Construction', 'Masonry']
  },
  {
    id: 'bamburi-nguvu-cement-32-5',
    name: 'MPa Bamburi Nguvu Cement',
    price: 650,
    description: 'Bamburi Nguvu Cement.',
    image: '/images/Nguvu-9.jpg',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa']
  },
  {
    id: 'bamburi-powermax-cement-42-5',
    name: 'MPa Bamburi Powermax Cement',
    price: 800,
    originalPrice: 1090,
    description: 'Bamburi Powermax Cement.',
    image: '/images/Bamburi-Power-Plus-Cement1-10.jpg',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa']
  },
  {
    id: 'bamburi-duracem-cement-42-5',
    name: 'MPa Bamburi Duracem Cement',
    price: 850,
    originalPrice: 1200,
    description: 'Bamburi Duracem Cement.',
    image: '/images/bamburi-duracem-1-11.png',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa']
  },
  {
    id: 'bamburi-powercrete-cement-52-5',
    name: 'MPa Bamburi Powercrete Cement',
    price: 950,
    originalPrice: 1650,
    description: 'Bamburi Powercrete Cement.',
    image: '/images/Buy-Bamburi-Powercrete-Cement-Online-1-12.jpg',
    category: 'cement',
    tags: ['Cement', 'Construction', 'MPa']
  }
];

export const allProducts = [
  ...cementProducts
];
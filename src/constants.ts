/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  amount: string;
  bonus?: string;
  price: string;
  category: 'PUBG' | 'Free Fire' | 'Mobile Legends' | 'Coins';
  badge?: string;
  icon?: string;
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'free-60',
    name: '60 PUBG UC',
    amount: '60 PUBG UC',
    bonus: 'BILAASH / FREE',
    price: 'BILAASH',
    category: 'PUBG',
    badge: 'PROMO',
    image: 'https://img.icons8.com/3d-fluency/180/gift--v2.png'
  },
  {
    id: '325-uc',
    name: '325 PUBG UC',
    amount: '325 PUBG UC',
    bonus: 'Delivery deg-deg ah',
    price: '$4.99',
    category: 'PUBG',
    image: 'https://img.icons8.com/3d-fluency/180/coins.png'
  },
  {
    id: '660-uc',
    name: '660 PUBG UC',
    amount: '660 PUBG UC',
    bonus: 'Aad loogu iibsado dukaanka',
    price: '$9.99',
    category: 'PUBG',
    badge: 'Hot',
    image: 'https://img.icons8.com/3d-fluency/180/ticket.png'
  },
  {
    id: '1800-uc',
    name: '1800 PUBG UC',
    amount: '1800 PUBG UC',
    bonus: 'Qiimaha ugu jaban',
    price: '$24.99',
    category: 'PUBG',
    badge: 'Best Value',
    image: 'https://img.icons8.com/3d-fluency/180/crown.png'
  },
  {
    id: '3',
    name: 'Standard Coins',
    amount: '5000 Coins',
    price: '$9.99',
    category: 'Coins',
    image: 'https://img.icons8.com/3d-fluency/180/coins.png'
  },
  {
    id: '4',
    name: 'Premium Coins',
    amount: '20000 + 5000 Coins',
    bonus: 'Abaalmarin VIP',
    price: '$34.99',
    category: 'Coins',
    badge: 'Qiimaha ugu Wanaagsan',
    image: 'https://img.icons8.com/3d-fluency/180/coins.png'
  },
  {
    id: '5',
    name: 'Free Fire Diamonds',
    amount: '2100 + 210 Diamonds',
    bonus: 'Kabaal weyn',
    price: '$19.99',
    category: 'Free Fire',
    badge: 'Qiimaha ugu Fiican',
    image: 'https://img.icons8.com/3d-fluency/180/diamond.png'
  },
  {
    id: '6',
    name: 'Mobile Legends',
    amount: '1000 Diamonds',
    price: '$14.99',
    category: 'Mobile Legends',
    image: 'https://img.icons8.com/3d-fluency/180/crystal.png'
  }
];

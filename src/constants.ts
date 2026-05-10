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
    id: '1',
    name: 'PUBG UC Pack',
    amount: '300 + 25 UC',
    bonus: 'Abaalmarin Degdeg ah',
    price: '$4.99',
    category: 'PUBG',
    badge: 'Bilowga',
    image: 'https://img.icons8.com/3d-fluency/180/ticket.png'
  },
  {
    id: '2',
    name: 'PUBG UC Pack',
    amount: '1500 + 300 UC',
    bonus: 'Xirmo Weyn',
    price: '$24.99',
    category: 'PUBG',
    badge: 'Ugu Caansan',
    image: 'https://img.icons8.com/3d-fluency/180/ticket.png'
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

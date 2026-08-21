/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import pubgUcImage from './assets/images/pubg_uc_coins_1787292925576.jpg';
import freefireDiamondsImage from './assets/images/freefire_diamonds_1787292939641.jpg';
import efootballCoinsImage from './assets/images/efootball_coins_1787292967232.jpg';

export interface Product {
  id: string;
  name: string;
  amount: string;
  bonus?: string;
  price: string;
  category: 'PUBG' | 'Free Fire' | 'eFootball' | 'Coins';
  badge?: string;
  icon?: string;
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'free-60',
    name: '60 UC BILAASH AH',
    amount: '60 UC',
    bonus: 'Hadyad Gaar ah',
    price: 'BILAASH',
    category: 'PUBG',
    badge: 'HADYAD',
    image: pubgUcImage
  },
  {
    id: 'pubg-660',
    name: 'PUBG Mobile UC',
    amount: '600 + 60 UC',
    bonus: 'Abaalmarin Degdeg ah',
    price: '$9.99',
    category: 'PUBG',
    badge: 'Bilowga',
    image: pubgUcImage
  },
  {
    id: 'pubg-1800',
    name: 'PUBG Mobile UC',
    amount: '1500 + 300 UC',
    bonus: 'Xirmo Royale Pass',
    price: '$24.99',
    category: 'PUBG',
    badge: 'Ugu Caansan',
    image: pubgUcImage
  },
  {
    id: 'pubg-3000',
    name: 'PUBG Mobile UC Pack',
    amount: '3,000 UC',
    bonus: 'Xirmo Weyn + Bonus',
    price: '$39.99',
    category: 'PUBG',
    badge: 'MEGA PACK',
    image: pubgUcImage
  },
  {
    id: 'ff-1060',
    name: 'Free Fire Diamonds',
    amount: '1,060 Diamonds',
    bonus: 'Dallacaad Degdeg ah',
    price: '$14.99',
    category: 'Free Fire',
    badge: 'POPULAR',
    image: freefireDiamondsImage
  },
  {
    id: 'ff-2000',
    name: 'Free Fire Diamonds',
    amount: '2,000 Diamonds',
    bonus: 'Elite Pass + Bonus',
    price: '$28.99',
    category: 'Free Fire',
    badge: 'Ugu Fiican',
    image: freefireDiamondsImage
  },
  {
    id: 'ff-5000',
    name: 'Free Fire 5,000 Diamonds',
    amount: '5,000 Diamonds',
    bonus: 'VIP Crate + Super Bonus',
    price: '$49.99',
    category: 'Free Fire',
    badge: 'SUPER VALUE',
    image: freefireDiamondsImage
  },
  {
    id: 'ef-500',
    name: 'eFootball Coins',
    amount: '500 Coins',
    bonus: 'Xirmo Bilow ah',
    price: '$4.99',
    category: 'eFootball',
    badge: 'BILOW',
    image: efootballCoinsImage
  },
  {
    id: 'ef-1000',
    name: 'eFootball Coins',
    amount: '1,000 Coins',
    bonus: 'Special Player Contract',
    price: '$9.99',
    category: 'eFootball',
    badge: 'CAAN AH',
    image: efootballCoinsImage
  },
  {
    id: 'ef-2100',
    name: 'eFootball Coins',
    amount: '2,100 Coins',
    bonus: 'Manager & Player Packs',
    price: '$19.99',
    category: 'eFootball',
    badge: 'NEW SEASON',
    image: efootballCoinsImage
  },
  {
    id: 'ef-5800',
    name: 'eFootball Coins',
    amount: '5,800 Coins',
    bonus: 'Epic Cards & Spin Boost',
    price: '$49.99',
    category: 'eFootball',
    badge: 'BEST SELLER',
    image: efootballCoinsImage
  },
  {
    id: 'ef-12500',
    name: 'eFootball 12,500 Coins',
    amount: '12,500 Coins',
    bonus: 'Unleash Your Team (VIP)',
    price: '$99.99',
    category: 'eFootball',
    badge: 'MAX PACK',
    image: efootballCoinsImage
  }
];

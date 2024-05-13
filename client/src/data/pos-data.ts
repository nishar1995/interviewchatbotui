import { cloneDeep } from 'lodash';

export const posProducts = [
  {
    id: 1,
    name: 'Chicken curry',
    description: 'South Asian dish',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/1.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 2,
    name: 'Iced tea with rose syrup',
    description: 'Cold Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/2.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 3,
    name: 'Strawberry cocktail drinks',
    description: 'Cold Coffee',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/3.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 4,
    name: 'Iced tea with rose syrup',
    description: 'Soft Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/4.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 5,
    name: 'CocaCola wit zero diet',
    description: 'Soft Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/5.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 6,
    name: 'Hawaiian Chicken PizzaSmoked',
    description: 'Fast Food Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/6.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 7,
    name: 'Pepsi with zero diet',
    description: 'Soft Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/7.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 8,
    name: 'Jimmy Willy Pizza with cheese',
    description: 'Fast Food Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/8.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 9,
    name: 'Hawaiian Chicken PizzaSmoked',
    description: 'Fast Food Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/9.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 10,
    name: 'Strawberry cocktail drinks',
    description: 'Cold Coffee',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/10.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 11,
    name: 'Pepsi with zero diet',
    description: 'Soft Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/11.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 12,
    name: 'Apricot ice cream balls',
    description: 'Ice Cream Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/12.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 13,
    name: 'CocaCola with zero diet',
    description: 'Soft Drinks',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/13.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
    discount: 15,
  },
  {
    id: 14,
    name: 'Strawberry cocktail drinks',
    description: 'Cold Coffee',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/14.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 15,
    name: 'Hawaiian Chicken PizzaSmoked',
    description: 'Fast Food Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/15.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
  {
    id: 16,
    name: 'Apricot ice cream balls',
    description: 'Ice Cream Items',
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/food/16.webp',
    price: 320,
    salePrice: 295,
    quantity: 10,
    size: 50,
  },
];

export const posData = cloneDeep(posProducts).map((product) => {
  return {
    ...product,
    id: product.id + posProducts.length,
  };
});

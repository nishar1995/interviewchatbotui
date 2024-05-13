import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const transactionTypes = {
  'Employee Salary': 'Employee Salary',
  'Yearly Bonus': 'Yearly Bonus',
  'Factory Expense': 'Factory Expense',
};

export const currencies = {
  USD: 'USD',
  Euro: 'Euro',
  Riyal: 'Riyal',
  Dirham: 'Dirham',
};

export const transactionStatuses = {
  Pending: 'Pending',
  Complete: 'Complete',
  Canceled: 'Canceled',
};

export const PaymentMethod = {
  Mastercard: 'Mastercard',
  Visa: 'Visa',
};

export type Type = keyof typeof transactionTypes;
export type StatusType = keyof typeof transactionStatuses;
export type PaymentMethodType = keyof typeof PaymentMethod;
export type CurrencyType = keyof typeof currencies;

export type RecentCustomersDataType = {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  date: Date;
  status: StatusType;
};

export type PaymentCardType = {
  cardType: string;
  lastCardNo: string;
};

export const transactionHistory = [
  {
    id: '3416',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Yearly Bonus',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Complete',
    amount: 450.54,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3417',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Employee Salary',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Pending',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
  {
    id: '3418',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'Riyal',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3419',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Employee Salary',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Complete',
    amount: 450.54,
    currency: 'Dirham',

    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3420',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
  {
    id: '3421',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Pending',
    amount: 450.54,
    currency: 'USD',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3422',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Complete',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
  {
    id: '3423',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Yearly Bonus',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Pending',
    amount: 450.54,
    currency: 'Riyal',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3424',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Yearly Bonus',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'Riyal',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3425',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expenses',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'Dirham',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
  {
    id: '3426',
    user: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Pending',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3527',
    user: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
  {
    id: '3428',
    user: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Complete',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3429',
    user: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Factory Expense',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Complete',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Mastercard',
      lastCardNo: '4242',
    },
  },
  {
    id: '3430',
    user: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Employee Salary',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Canceled',
    amount: 450.54,
    currency: 'Euro',
    paymentMethod: {
      cardType: 'Visa',
      lastCardNo: '5846',
    },
  },
];

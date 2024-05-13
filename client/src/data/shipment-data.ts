import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const priorities = {
  Low: 'Low',
  High: 'High',
  Medium: 'Medium',
};
export const shippingStatuses = {
  Approved: 'Approved',
  InTransit: 'In Transit',
  OutForDelivery: 'Out For Delivery',
  Delivered: 'Delivered',
  DeliveryFailed: 'Delivery Failed',
};
export const paymentMethods = {
  CashOnDelivery: 'Cash on Delivery',
  CardPayment: 'Card Payment',
  PayPal: 'PayPal',
  ApplePay: 'Apple Pay',
  GooglePay: 'Google Pay',
};

export type PriorityType = keyof typeof priorities;
export type StatusType =
  | 'Approved'
  | 'In Transit'
  | 'Out For Delivery'
  | 'Delivered'
  | 'Delivery Failed';

type Person = {
  name: string;
  avatar: string;
};

export type TicketType = {
  id: string;
  trackingId: string;
  date: Date;
  sender: Person;
  receiver: Person;
  origin: string;
  destination: string;
  paymentMethod: string;
  status: StatusType;
};

export type ShipmentType = {
  id: string;
  trackingNumber: string;
  recipient: {
    name: string;
    avatar: string;
  };
  destination: string;
  date: Date;
  cost: string;
  payment: string;
  status: StatusType;
  invoiceStatus: string;
};

export const shipmentData = [
  {
    id: 'da6ec6cf-bf80-4d92-b1fb-8f96c537ae30',
    trackingId: 'HHP6411',
    date: '2018-06-08T23:09:12.576Z',
    sender: {
      name: 'Tracy Rempel',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Priscilla Price',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Kazakhstan',
    destination: 'Hong Kong',
    paymentMethod: 'Google Pay',
    status: 'Delivered',
  },
  {
    id: '7f4d4b25-aa50-4e36-b208-b6d30b71aa6d',
    trackingId: 'HHP3454',
    date: '2021-08-23T01:40:25.825Z',
    sender: {
      name: 'Nelson Toy',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Wesley Gulgowski-Hayes',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Monaco',
    destination: 'Albania',
    paymentMethod: 'Apple Pay',
    status: 'Delivered',
  },
  {
    id: 'de96661f-dd18-4c7d-8d26-d7f401ff2d51',
    trackingId: 'HHP1979',
    date: '2018-12-12T14:11:29.183Z',
    sender: {
      name: 'Cristina Waelchi',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Owen Stokes',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Suriname',
    destination: 'Tanzania',
    paymentMethod: 'Cash on Delivery',
    status: 'Approved',
  },
  {
    id: '88ea91b3-a70c-4808-ad6e-a45641ec1be1',
    trackingId: 'HHP2430',
    date: '2021-07-08T18:04:03.850Z',
    sender: {
      name: 'Carole Bogan',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Billie Nienow',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'China',
    destination: 'Sweden',
    paymentMethod: 'PayPal',
    status: 'Delivery Failed',
  },
  {
    id: '0953f1c7-7edb-4b64-9d19-4f8248a0eba0',
    trackingId: 'HHP2594',
    date: '2022-12-28T05:29:57.101Z',
    sender: {
      name: 'Marian Will',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Nicholas Carter',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Libyan Arab Jamahiriya',
    destination: 'Turkmenistan',
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
  },
  {
    id: 'b70eca3d-72bc-412f-9fce-3e8b6e433d3c',
    trackingId: 'HHP1933',
    date: '2022-03-22T18:34:46.584Z',
    sender: {
      name: 'Kristen Kirlin',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Audrey Conroy',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Belize',
    destination: 'Chile',
    paymentMethod: 'Card Payment',
    status: 'Approved',
  },
  {
    id: 'e714dc27-8463-497c-ad53-b0d0a06b0283',
    trackingId: 'HHP7784',
    date: '2022-04-28T00:43:49.934Z',
    sender: {
      name: 'Kim Nicolas',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Randolph Heller',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Uganda',
    destination: 'Panama',
    paymentMethod: 'Google Pay',
    status: 'Delivery Failed',
  },
  {
    id: '13ce0dc7-b4e6-4c18-99fc-87d18044a9c9',
    trackingId: 'HHP1670',
    date: '2018-01-30T08:52:47.969Z',
    sender: {
      name: 'Jaime Murazik',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Annette Hyatt',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Guadeloupe',
    destination: 'Tonga',
    paymentMethod: 'Apple Pay',
    status: 'In Transit',
  },
  {
    id: '9831e914-6344-4e71-a875-d73dfc0bca0f',
    trackingId: 'HHP6091',
    date: '2021-12-03T10:40:20.654Z',
    sender: {
      name: 'Kathy Zemlak',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Gwen Bernier',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Dominican Republic',
    destination: 'Tokelau',
    paymentMethod: 'Google Pay',
    status: 'Out For Delivery',
  },
  {
    id: '66eef98c-32cb-42b6-970b-686921f3f9ba',
    trackingId: 'HHP0563',
    date: '2021-09-01T19:33:23.836Z',
    sender: {
      name: 'Mr. Luis Schmeler-Legros',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Noel Funk',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Somalia',
    destination: 'Algeria',
    paymentMethod: 'Card Payment',
    status: 'Delivered',
  },
  {
    id: '329b1a06-362f-461d-addb-c9fa1d37044d',
    trackingId: 'HHP8377',
    date: '2018-12-17T02:29:56.581Z',
    sender: {
      name: 'Laurie Beer',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'James Welch',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Switzerland',
    destination: 'Mongolia',
    paymentMethod: 'Card Payment',
    status: 'In Transit',
  },
  {
    id: '9a3d54e7-2579-41eb-937a-2035fd85062c',
    trackingId: 'HHP6410',
    date: '2018-11-12T19:24:31.825Z',
    sender: {
      name: 'Cheryl Corkery',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Mr. Kyle Pfeffer',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Guinea-Bissau',
    destination: 'Isle of Man',
    paymentMethod: 'PayPal',
    status: 'Approved',
  },
  {
    id: '2d5f9fe2-2dd4-4c15-91fa-8798225cda5c',
    trackingId: 'HHP5268',
    date: '2019-07-21T21:25:28.867Z',
    sender: {
      name: 'Bennie Weber',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Arnold Leannon',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Bolivia',
    destination: 'Azerbaijan',
    paymentMethod: 'Card Payment',
    status: 'Approved',
  },
  {
    id: '65bc0a73-aaf0-4f48-b015-b7ecc9b6db01',
    trackingId: 'HHP1247',
    date: '2018-07-19T00:17:13.182Z',
    sender: {
      name: 'Moses Bashirian',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Dr. Darlene Roberts',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Lithuania',
    destination: 'Uruguay',
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
  },
  {
    id: 'bcea1ed7-958e-4f1a-8a2d-c4e10e65fae8',
    trackingId: 'HHP7998',
    date: '2019-09-27T03:37:39.519Z',
    sender: {
      name: 'Beulah Rohan',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Arthur Goyette',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Cayman Islands',
    destination: 'Moldova',
    paymentMethod: 'Card Payment',
    status: 'In Transit',
  },
  {
    id: 'e306af51-35a0-4135-825e-d338a0e6f8ae',
    trackingId: 'HHP5221',
    date: '2020-10-05T04:42:12.119Z',
    sender: {
      name: 'Kelli Pfannerstill',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Dr. Christopher Baumbach',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Fiji',
    destination: 'Zimbabwe',
    paymentMethod: 'Apple Pay',
    status: 'Delivery Failed',
  },
  {
    id: '5c737802-553c-4d35-86b0-07556c3b5e5a',
    trackingId: 'HHP1525',
    date: '2018-02-16T16:28:23.890Z',
    sender: {
      name: 'Terry Kautzer',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Alfredo Cruickshank',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Christmas Island',
    destination: 'Western Sahara',
    paymentMethod: 'Apple Pay',
    status: 'Delivered',
  },
  {
    id: '05f3f25a-095b-4be8-b961-6b98c248836e',
    trackingId: 'HHP0731',
    date: '2022-08-12T19:29:25.633Z',
    sender: {
      name: 'Marco Koss',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Mario Howe',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Vietnam',
    destination: 'Kuwait',
    paymentMethod: 'Apple Pay',
    status: 'Out For Delivery',
  },
  {
    id: '4e97bdb2-8e20-435b-8b46-db240375321f',
    trackingId: 'HHP3581',
    date: '2018-06-21T09:13:03.760Z',
    sender: {
      name: 'Eugene Feest',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Sue Lind',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Niger',
    destination: 'Madagascar',
    paymentMethod: 'PayPal',
    status: 'Delivery Failed',
  },
  {
    id: 'e1cec898-e46f-418c-bb8b-b3c3d4845420',
    trackingId: 'HHP0951',
    date: '2021-11-05T23:53:38.522Z',
    sender: {
      name: 'Pat Bruen',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Ted Ortiz',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'United Arab Emirates',
    destination: 'Mayotte',
    paymentMethod: 'Cash on Delivery',
    status: 'Out For Delivery',
  },
  {
    id: '2cef960c-76bc-4a3e-9141-95eed115fdda',
    trackingId: 'HHP1172',
    date: '2018-04-17T14:57:41.296Z',
    sender: {
      name: 'Carole Price',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Donnie Medhurst DVM',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Singapore',
    destination: 'Tuvalu',
    paymentMethod: 'Card Payment',
    status: 'Delivery Failed',
  },
  {
    id: '6c629288-fd34-433f-b350-68a42a217649',
    trackingId: 'HHP1604',
    date: '2021-10-22T13:49:10.836Z',
    sender: {
      name: 'Gilbert McKenzie',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Kristen Legros',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Kiribati',
    destination: 'Burkina Faso',
    paymentMethod: 'Card Payment',
    status: 'Out For Delivery',
  },
  {
    id: '131e46cf-0766-4b34-a630-2e90b040da95',
    trackingId: 'HHP6937',
    date: '2023-07-29T06:31:45.685Z',
    sender: {
      name: 'Muriel Gorczany',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Wilfred Larson',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Faroe Islands',
    destination: 'Chile',
    paymentMethod: 'Cash on Delivery',
    status: 'Out For Delivery',
  },
  {
    id: '22ef247b-0121-425e-9705-fe0449ce3ac2',
    trackingId: 'HHP8783',
    date: '2021-08-23T11:30:13.169Z',
    sender: {
      name: 'Lela Powlowski',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Dora Bradtke',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Turkmenistan',
    destination: 'Svalbard & Jan Mayen Islands',
    paymentMethod: 'Card Payment',
    status: 'Delivery Failed',
  },
  {
    id: '0236d69e-8a95-4c40-a5ea-fdf3e89e6c0d',
    trackingId: 'HHP3592',
    date: '2020-05-28T08:50:59.653Z',
    sender: {
      name: 'Ginger Effertz',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    receiver: {
      name: 'Janis Schiller',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    origin: 'Cuba',
    destination: 'Malta',
    paymentMethod: 'PayPal',
    status: 'Out For Delivery',
  },
];

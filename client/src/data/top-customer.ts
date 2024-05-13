import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export type TopCustomerType = {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  country: {
    name: string;
    code: string;
  };
  noOfShipment: number;
  cost: string;
};

export const topCustomers = [
  {
    id: 'SE858',
    user: {
      name: 'Eleanor Tillman',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'jared_weimann57@yahoo.com',
    },
    country: {
      name: 'Central African Republic',
      code: 'CF',
    },
    noOfShipment: 9,
    cost: '689.00',
  },
  {
    id: 'VP325',
    user: {
      name: 'Jack Rath',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'gloria_mohr@hotmail.com',
    },
    country: {
      name: 'Dominica',
      code: 'DM',
    },
    noOfShipment: 1,
    cost: '737.00',
  },
  {
    id: 'EC639',
    user: {
      name: 'Dr. Terri Stracke',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'aliza.wiza29@gmail.com',
    },
    country: {
      name: 'Democratic Republic of the Congo',
      code: 'CD',
    },
    noOfShipment: 6,
    cost: '415.00',
  },
  {
    id: 'MZ671',
    user: {
      name: 'Ms. Doreen Aufderhar',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'lurline.nienow45@yahoo.com',
    },
    country: {
      name: 'Venezuela',
      code: 'VE',
    },
    noOfShipment: 6,
    cost: '744.00',
  },
  {
    id: 'RG510',
    user: {
      name: 'Florence Hoeger',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'maiya_bailey@gmail.com',
    },
    country: {
      name: 'Norway',
      code: 'NO',
    },
    noOfShipment: 3,
    cost: '408.00',
  },
  {
    id: 'QS080',
    user: {
      name: 'Dr. Albert Beer',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'jarred_sipes@hotmail.com',
    },
    country: {
      name: 'Uganda',
      code: 'UG',
    },
    noOfShipment: 4,
    cost: '746.00',
  },
  {
    id: 'UO154',
    user: {
      name: 'Sean Goyette',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'sigmund_zieme@yahoo.com',
    },
    country: {
      name: 'Finland',
      code: 'FI',
    },
    noOfShipment: 5,
    cost: '800.00',
  },
  {
    id: 'SO247',
    user: {
      name: 'Gregg Kling',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'mason_macejkovic@gmail.com',
    },
    country: {
      name: 'Saint Martin',
      code: 'MF',
    },
    noOfShipment: 4,
    cost: '501.00',
  },
  {
    id: 'LR832',
    user: {
      name: 'Chelsea Thiel',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'abby.kemmer68@hotmail.com',
    },
    country: {
      name: 'Republic of Korea',
      code: 'KR',
    },
    noOfShipment: 8,
    cost: '153.00',
  },
  {
    id: 'ME262',
    user: {
      name: 'Virginia Schumm',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'royal.schinner79@hotmail.com',
    },
    country: {
      name: 'Georgia',
      code: 'GE',
    },
    noOfShipment: 8,
    cost: '994.00',
  },
  {
    id: 'YP369',
    user: {
      name: 'Mrs. Opal Kuphal-Crist',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'doris_parisian@yahoo.com',
    },
    country: {
      name: "Democratic People's Republic of Korea",
      code: 'KP',
    },
    noOfShipment: 1,
    cost: '172.00',
  },
  {
    id: 'ZK736',
    user: {
      name: 'Tanya Wintheiser',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'mina_hilpert@yahoo.com',
    },
    country: {
      name: 'Heard Island and McDonald Islands',
      code: 'HM',
    },
    noOfShipment: 5,
    cost: '103.00',
  },
  {
    id: 'NS479',
    user: {
      name: 'Lola Walter V',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'evie_deckow@gmail.com',
    },
    country: {
      name: 'El Salvador',
      code: 'SV',
    },
    noOfShipment: 4,
    cost: '568.00',
  },
  {
    id: 'DF799',
    user: {
      name: 'Ronnie Grant-Ruecker',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'clemmie_bergstrom@gmail.com',
    },
    country: {
      name: 'Guinea',
      code: 'GN',
    },
    noOfShipment: 9,
    cost: '204.00',
  },
  {
    id: 'AZ892',
    user: {
      name: 'Fannie Hartmann',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
      email: 'keith_herzog57@yahoo.com',
    },
    country: {
      name: 'Montserrat',
      code: 'MS',
    },
    noOfShipment: 5,
    cost: '636.00',
  },
];

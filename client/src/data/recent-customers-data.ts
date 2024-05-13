import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const PLAN = {
  Basic: 'Basic',
  Company: 'Company',
  Professional: 'Professional',
  Team: 'Team',
};

export const STATUS = {
  Online: 'Online',
  Offline: 'Offline',
};

export interface Customer {
  id: string;
  customer: {
    fullName: string;
    email: string;
    avatar: string;
  };
  plan: keyof typeof PLAN;
  mrr: number;
  createdAt: Date;
  paymentMethod: {
    name: string;
    cardNumber: string;
  };
  status: keyof typeof STATUS;
  chart: {
    activity: number;
  }[];
}

export const recentCustomers = [
  {
    id: '3349',
    customer: {
      fullName: 'Thomas Kautzer',
      email: 'johanna26@gmail.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Company',
    mrr: 707.8717868675012,
    createdAt: '2023-01-19T02:15:51.276Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '0556',
    },
    status: 'Offline',
    chart: [
      {
        activity: 92,
      },
      {
        activity: 53,
      },
      {
        activity: 81,
      },
      {
        activity: 50,
      },
      {
        activity: 60,
      },
      {
        activity: 73,
      },
      {
        activity: 81,
      },
      {
        activity: 71,
      },
      {
        activity: 92,
      },
      {
        activity: 64,
      },
      {
        activity: 60,
      },
      {
        activity: 83,
      },
      {
        activity: 98,
      },
      {
        activity: 70,
      },
      {
        activity: 71,
      },
    ],
  },
  {
    id: '8781',
    customer: {
      fullName: 'Billie Blick',
      email: 'francis_stiedemann57@hotmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/558.jpg',
    },
    plan: 'Professional',
    mrr: 279.5092791453935,
    createdAt: '2023-05-22T14:47:36.973Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '5071',
    },
    status: 'Offline',
    chart: [
      {
        activity: 87,
      },
      {
        activity: 54,
      },
      {
        activity: 68,
      },
      {
        activity: 53,
      },
      {
        activity: 84,
      },
      {
        activity: 79,
      },
      {
        activity: 84,
      },
      {
        activity: 87,
      },
      {
        activity: 55,
      },
      {
        activity: 86,
      },
      {
        activity: 91,
      },
      {
        activity: 63,
      },
      {
        activity: 61,
      },
      {
        activity: 62,
      },
      {
        activity: 85,
      },
    ],
  },
  {
    id: '5063',
    customer: {
      fullName: 'Mr. John Hoeger',
      email: 'evan_hudson@yahoo.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Team',
    mrr: 607.2399900024757,
    createdAt: '2022-11-22T13:35:33.975Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '6010',
    },
    status: 'Offline',
    chart: [
      {
        activity: 88,
      },
      {
        activity: 63,
      },
      {
        activity: 65,
      },
      {
        activity: 80,
      },
      {
        activity: 84,
      },
      {
        activity: 80,
      },
      {
        activity: 80,
      },
      {
        activity: 59,
      },
      {
        activity: 98,
      },
      {
        activity: 73,
      },
      {
        activity: 57,
      },
      {
        activity: 95,
      },
      {
        activity: 76,
      },
      {
        activity: 56,
      },
      {
        activity: 51,
      },
    ],
  },
  {
    id: '4587',
    customer: {
      fullName: 'Lynda White',
      email: 'janice_jacobi@hotmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1105.jpg',
    },
    plan: 'Company',
    mrr: 514.4363453749102,
    createdAt: '2022-12-24T01:32:57.822Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '8105',
    },
    status: 'Offline',
    chart: [
      {
        activity: 58,
      },
      {
        activity: 71,
      },
      {
        activity: 70,
      },
      {
        activity: 90,
      },
      {
        activity: 62,
      },
      {
        activity: 62,
      },
      {
        activity: 71,
      },
      {
        activity: 58,
      },
      {
        activity: 65,
      },
      {
        activity: 62,
      },
      {
        activity: 92,
      },
      {
        activity: 64,
      },
      {
        activity: 96,
      },
      {
        activity: 50,
      },
      {
        activity: 80,
      },
    ],
  },
  {
    id: '9759',
    customer: {
      fullName: 'Madeline Cruickshank Jr.',
      email: 'kelsi.cruickshank@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/782.jpg',
    },
    plan: 'Team',
    mrr: 187.65266591124237,
    createdAt: '2023-04-05T20:53:06.245Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '0498',
    },
    status: 'Offline',
    chart: [
      {
        activity: 99,
      },
      {
        activity: 58,
      },
      {
        activity: 83,
      },
      {
        activity: 57,
      },
      {
        activity: 94,
      },
      {
        activity: 63,
      },
      {
        activity: 80,
      },
      {
        activity: 51,
      },
      {
        activity: 52,
      },
      {
        activity: 62,
      },
      {
        activity: 52,
      },
      {
        activity: 67,
      },
      {
        activity: 85,
      },
      {
        activity: 91,
      },
      {
        activity: 99,
      },
    ],
  },
  {
    id: '4334',
    customer: {
      fullName: 'Pauline Rath',
      email: 'mustafa.hagenes@yahoo.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Team',
    mrr: 114.60813575331122,
    createdAt: '2023-02-24T11:04:38.935Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '1170',
    },
    status: 'Offline',
    chart: [
      {
        activity: 75,
      },
      {
        activity: 71,
      },
      {
        activity: 83,
      },
      {
        activity: 71,
      },
      {
        activity: 80,
      },
      {
        activity: 98,
      },
      {
        activity: 100,
      },
      {
        activity: 80,
      },
      {
        activity: 76,
      },
      {
        activity: 71,
      },
      {
        activity: 98,
      },
      {
        activity: 57,
      },
      {
        activity: 88,
      },
      {
        activity: 79,
      },
      {
        activity: 97,
      },
    ],
  },
  {
    id: '3626',
    customer: {
      fullName: 'Constance Predovic',
      email: 'jamar_purdy22@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/469.jpg',
    },
    plan: 'Company',
    mrr: 213.32488414412364,
    createdAt: '2023-09-14T17:54:14.674Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '5218',
    },
    status: 'Offline',
    chart: [
      {
        activity: 62,
      },
      {
        activity: 89,
      },
      {
        activity: 72,
      },
      {
        activity: 65,
      },
      {
        activity: 100,
      },
      {
        activity: 69,
      },
      {
        activity: 68,
      },
      {
        activity: 94,
      },
      {
        activity: 73,
      },
      {
        activity: 62,
      },
      {
        activity: 62,
      },
      {
        activity: 76,
      },
      {
        activity: 78,
      },
      {
        activity: 65,
      },
      {
        activity: 89,
      },
    ],
  },
  {
    id: '7006',
    customer: {
      fullName: 'Ella Abbott',
      email: 'amaya.koepp90@gmail.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Team',
    mrr: 633.7956209226977,
    createdAt: '2023-05-05T01:00:32.451Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '4682',
    },
    status: 'Offline',
    chart: [
      {
        activity: 57,
      },
      {
        activity: 69,
      },
      {
        activity: 71,
      },
      {
        activity: 69,
      },
      {
        activity: 64,
      },
      {
        activity: 99,
      },
      {
        activity: 67,
      },
      {
        activity: 51,
      },
      {
        activity: 69,
      },
      {
        activity: 89,
      },
      {
        activity: 69,
      },
      {
        activity: 78,
      },
      {
        activity: 76,
      },
      {
        activity: 74,
      },
      {
        activity: 78,
      },
    ],
  },
  {
    id: '8468',
    customer: {
      fullName: "Jodi O'Reilly",
      email: 'name24@gmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/775.jpg',
    },
    plan: 'Basic',
    mrr: 249.5680028880015,
    createdAt: '2022-12-07T16:12:27.760Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '3986',
    },
    status: 'Offline',
    chart: [
      {
        activity: 86,
      },
      {
        activity: 63,
      },
      {
        activity: 97,
      },
      {
        activity: 61,
      },
      {
        activity: 69,
      },
      {
        activity: 75,
      },
      {
        activity: 80,
      },
      {
        activity: 68,
      },
      {
        activity: 63,
      },
      {
        activity: 63,
      },
      {
        activity: 59,
      },
      {
        activity: 51,
      },
      {
        activity: 99,
      },
      {
        activity: 65,
      },
      {
        activity: 50,
      },
    ],
  },
  {
    id: '9088',
    customer: {
      fullName: 'Sheryl Konopelski',
      email: 'parker.harris@gmail.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Professional',
    mrr: 398.7717403424904,
    createdAt: '2023-08-03T03:44:27.400Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '6779',
    },
    status: 'Online',
    chart: [
      {
        activity: 61,
      },
      {
        activity: 96,
      },
      {
        activity: 57,
      },
      {
        activity: 55,
      },
      {
        activity: 87,
      },
      {
        activity: 54,
      },
      {
        activity: 80,
      },
      {
        activity: 82,
      },
      {
        activity: 95,
      },
      {
        activity: 50,
      },
      {
        activity: 75,
      },
      {
        activity: 69,
      },
      {
        activity: 69,
      },
      {
        activity: 94,
      },
      {
        activity: 81,
      },
    ],
  },
  {
    id: '2005',
    customer: {
      fullName: 'Tara Hoppe',
      email: 'alex_greenholt83@gmail.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Basic',
    mrr: 335.77883241069503,
    createdAt: '2023-01-27T20:21:52.670Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '5573',
    },
    status: 'Offline',
    chart: [
      {
        activity: 82,
      },
      {
        activity: 72,
      },
      {
        activity: 74,
      },
      {
        activity: 78,
      },
      {
        activity: 92,
      },
      {
        activity: 74,
      },
      {
        activity: 53,
      },
      {
        activity: 97,
      },
      {
        activity: 92,
      },
      {
        activity: 81,
      },
      {
        activity: 59,
      },
      {
        activity: 88,
      },
      {
        activity: 55,
      },
      {
        activity: 86,
      },
      {
        activity: 73,
      },
    ],
  },
  {
    id: '4983',
    customer: {
      fullName: 'Mr. Kelvin Koelpin',
      email: 'vickie.pfeffer54@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/539.jpg',
    },
    plan: 'Professional',
    mrr: 759.8048285467084,
    createdAt: '2023-08-15T22:29:17.025Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '9159',
    },
    status: 'Online',
    chart: [
      {
        activity: 70,
      },
      {
        activity: 73,
      },
      {
        activity: 60,
      },
      {
        activity: 73,
      },
      {
        activity: 67,
      },
      {
        activity: 73,
      },
      {
        activity: 63,
      },
      {
        activity: 96,
      },
      {
        activity: 96,
      },
      {
        activity: 65,
      },
      {
        activity: 54,
      },
      {
        activity: 50,
      },
      {
        activity: 64,
      },
      {
        activity: 63,
      },
      {
        activity: 68,
      },
    ],
  },
  {
    id: '2015',
    customer: {
      fullName: 'Corey Huels-Marvin',
      email: 'ricky16@hotmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/449.jpg',
    },
    plan: 'Team',
    mrr: 436.5551588071976,
    createdAt: '2023-09-25T02:48:01.054Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '1659',
    },
    status: 'Offline',
    chart: [
      {
        activity: 60,
      },
      {
        activity: 85,
      },
      {
        activity: 81,
      },
      {
        activity: 67,
      },
      {
        activity: 80,
      },
      {
        activity: 55,
      },
      {
        activity: 82,
      },
      {
        activity: 89,
      },
      {
        activity: 77,
      },
      {
        activity: 54,
      },
      {
        activity: 84,
      },
      {
        activity: 93,
      },
      {
        activity: 92,
      },
      {
        activity: 86,
      },
      {
        activity: 67,
      },
    ],
  },
  {
    id: '6563',
    customer: {
      fullName: 'Leroy Schimmel',
      email: 'darien42@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/350.jpg',
    },
    plan: 'Team',
    mrr: 978.2360064478125,
    createdAt: '2023-06-24T03:49:58.531Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '5966',
    },
    status: 'Offline',
    chart: [
      {
        activity: 85,
      },
      {
        activity: 90,
      },
      {
        activity: 96,
      },
      {
        activity: 85,
      },
      {
        activity: 84,
      },
      {
        activity: 91,
      },
      {
        activity: 86,
      },
      {
        activity: 66,
      },
      {
        activity: 69,
      },
      {
        activity: 84,
      },
      {
        activity: 50,
      },
      {
        activity: 60,
      },
      {
        activity: 84,
      },
      {
        activity: 54,
      },
      {
        activity: 85,
      },
    ],
  },
  {
    id: '2248',
    customer: {
      fullName: 'Meghan Luettgen',
      email: 'titus.thiel19@hotmail.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Company',
    mrr: 418.41625645244494,
    createdAt: '2023-03-05T13:58:59.822Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '0296',
    },
    status: 'Online',
    chart: [
      {
        activity: 51,
      },
      {
        activity: 58,
      },
      {
        activity: 100,
      },
      {
        activity: 97,
      },
      {
        activity: 59,
      },
      {
        activity: 79,
      },
      {
        activity: 95,
      },
      {
        activity: 84,
      },
      {
        activity: 82,
      },
      {
        activity: 99,
      },
      {
        activity: 71,
      },
      {
        activity: 77,
      },
      {
        activity: 70,
      },
      {
        activity: 82,
      },
      {
        activity: 96,
      },
    ],
  },
  {
    id: '3745',
    customer: {
      fullName: 'Jana Volkman-Nader',
      email: 'alva.jenkins@yahoo.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    plan: 'Company',
    mrr: 648.9306477382779,
    createdAt: '2023-10-02T23:24:27.465Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '1399',
    },
    status: 'Online',
    chart: [
      {
        activity: 63,
      },
      {
        activity: 67,
      },
      {
        activity: 100,
      },
      {
        activity: 68,
      },
      {
        activity: 77,
      },
      {
        activity: 63,
      },
      {
        activity: 57,
      },
      {
        activity: 82,
      },
      {
        activity: 83,
      },
      {
        activity: 65,
      },
      {
        activity: 97,
      },
      {
        activity: 88,
      },
      {
        activity: 90,
      },
      {
        activity: 50,
      },
      {
        activity: 94,
      },
    ],
  },
  {
    id: '9994',
    customer: {
      fullName: 'Gary Marvin',
      email: 'herminio_dach@hotmail.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/658.jpg',
    },
    plan: 'Company',
    mrr: 479.40014656540006,
    createdAt: '2023-08-30T15:34:11.937Z',
    paymentMethod: {
      name: 'Visa',
      cardNumber: '0967',
    },
    status: 'Offline',
    chart: [
      {
        activity: 51,
      },
      {
        activity: 60,
      },
      {
        activity: 87,
      },
      {
        activity: 74,
      },
      {
        activity: 66,
      },
      {
        activity: 57,
      },
      {
        activity: 97,
      },
      {
        activity: 84,
      },
      {
        activity: 94,
      },
      {
        activity: 57,
      },
      {
        activity: 89,
      },
      {
        activity: 57,
      },
      {
        activity: 96,
      },
      {
        activity: 89,
      },
      {
        activity: 59,
      },
    ],
  },
  {
    id: '7320',
    customer: {
      fullName: 'Carol DuBuque',
      email: 'flavie.gorczany@yahoo.com',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/767.jpg',
    },
    plan: 'Team',
    mrr: 137.8435483125504,
    createdAt: '2023-11-11T06:19:15.473Z',
    paymentMethod: {
      name: 'MasterCard',
      cardNumber: '3098',
    },
    status: 'Offline',
    chart: [
      {
        activity: 63,
      },
      {
        activity: 82,
      },
      {
        activity: 100,
      },
      {
        activity: 55,
      },
      {
        activity: 96,
      },
      {
        activity: 77,
      },
      {
        activity: 100,
      },
      {
        activity: 51,
      },
      {
        activity: 62,
      },
      {
        activity: 60,
      },
      {
        activity: 78,
      },
      {
        activity: 67,
      },
      {
        activity: 77,
      },
      {
        activity: 51,
      },
      {
        activity: 61,
      },
    ],
  },
];

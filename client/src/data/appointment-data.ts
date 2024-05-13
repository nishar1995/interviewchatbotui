import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const appointmentTypes = {
  'Video Editing': 'Video Editing',
  'Digital Marketing': 'Digital Marketing',
 IT: 'IT',
  HR: 'HR',
};
export const appointmentStatuses = {
  Scheduled: 'Scheduled',
  Waiting: 'Waiting',
};

export type Type = keyof typeof appointmentTypes;
export type StatusType = keyof typeof appointmentStatuses;

export const appointmentData = [
  {
    id: '3416',
    candidate: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    doctor: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Video Editing',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Scheduled',
    // amount: 45.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3417',
    candidate: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
    },
    doctor: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'IT',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 120,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3418',
    candidate: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
    },
    doctor: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3419',
    candidate: {
      name: 'Omar Haag',
      email: 'omar@example.com',
    },
    doctor: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Digital Marketing',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Scheduled',
    // amount: 45.54,
    duration: 10,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3420',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3421',
    candidate: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    doctor: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Digital Marketing',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 30,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    candidate: {
      name: 'Omar Haag',
      email: 'omar@example.com',
    },
    doctor: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Video Editing',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    // amount: 45.0,
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3423',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Video Editing',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3424',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Video Editing',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Waiting',
    // amount: 55.54,
    duration: 120,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3425',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Digital Marketing',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 10,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3426',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Waiting',
    // amount: 35.0,
    duration: 35,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3527',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 15,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3428',
    candidate: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
    },
    doctor: {
      name: 'Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Scheduled',
    // amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3429',
    candidate: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
    },
    doctor: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'HR',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Scheduled',
    // amount: 50.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3430',
    candidate: {
      name: 'Johnnie Kassulke',
      email: 'johnnie@example.com',
    },
    doctor: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'IT',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    // amount: 45.54,
    duration: 120,
    address: '1200 E Apache Blvd, Arkansas, USA',
  },
];

function generateCountdownDate(hour: number = 5, minute: number = 10) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(date.getHours() - hour);
  date.setMinutes(date.getMinutes() - minute);
  return date;
}

export const filterNftsData = [
  {
    name: 'Ingrid Swril',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username: '@jamo254',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/6.webp',
    username2: 'Renya',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-1.webp',
    endsAt: generateCountdownDate(9, 9),
  },
  {
    name: 'CodeCrafted',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username: '@jamo254',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/5.webp',
    username2: 'Renya',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-2.webp',
    endsAt: generateCountdownDate(15, 5),
  },
  {
    name: 'Chronicles',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username: '@jamo254',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username2: 'Renya',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-3.webp',
    endsAt: generateCountdownDate(5, 9),
  },
  {
    name: 'CyberSculpture ',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username: '@jamo254',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username2: 'Renya',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-4.webp',
    endsAt: generateCountdownDate(7, 8),
  },
  {
    name: 'Quantum Pixel',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/5.webp',
    username: '@alex2001',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username2: 'Benjamin',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-5.webp',
    endsAt: generateCountdownDate(7, 25),
  },
  {
    name: 'Gemstone Glyphs',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/6.webp',
    username: '@lily648',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username2: 'Lily',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-6.webp',
    endsAt: generateCountdownDate(9, 21),
  },
  {
    name: 'Digital Dreamscapes',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username: '@emma1102',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/6.webp',
    username2: 'William',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-7.webp',
    endsAt: generateCountdownDate(11, 25),
  },
  {
    name: 'Enigma Art',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username: '@jack',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/5.webp',
    username2: 'Zoe',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-8.webp',
    endsAt: generateCountdownDate(13, 25),
  },
  {
    name: 'EtherLuxe Landscapes',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username: '@grace',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username2: 'Jackson',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-9.webp',
    endsAt: generateCountdownDate(14, 25),
  },
  {
    name: 'CyberSculptures',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username: '@ethan',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username2: 'Henry',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-10.webp',
    endsAt: generateCountdownDate(12, 25),
  },
  {
    name: 'Masterpieces',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/5.webp',
    username: '@sophia',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username2: 'Elijah',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-11.webp',
    endsAt: generateCountdownDate(15, 25),
  },
  {
    name: 'Nebula Novelties',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/6.webp',
    username: '@luke056',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username2: 'Charlotte',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-12.webp',
    endsAt: generateCountdownDate(16, 25),
  },
  {
    name: 'CryptoChroma Collection',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username: '@ruby945',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username2: 'Samuel',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-13.webp',
    endsAt: generateCountdownDate(10, 25),
  },
  {
    name: 'Vortex Visions',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/2.webp',
    username: '@owen',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/1.webp',
    username2: 'Andrew',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-14.webp',
    endsAt: generateCountdownDate(8, 25),
  },
  {
    name: 'Nature Wonders',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username: '@leo946',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/3.webp',
    username2: 'Ava',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-15.webp',
    endsAt: generateCountdownDate(7, 25),
  },
  {
    name: 'Crystal Creations',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username: '@anna',
    avatar2:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/avatar/4.webp',
    username2: 'Abigail',
    currentBid: true,
    endsIn: '2023-12-31T23:59:59',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/nft/thumbnails/nft-16.webp',
    endsAt: generateCountdownDate(3, 25),
  },
];

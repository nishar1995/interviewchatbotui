import { Metadata } from 'next';
import logoImg from '@public/HRK.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'HRK Solutions',
  description: `Isomorphic the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - HRK Solutions` : siteConfig.title,
    description,
    icons:{
      icon: '/HRK.svg'
    },
    openGraph: openGraph ?? {
      title: title ? `${title} - HRK Solutions` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'HRK Solutions', // https://developers.google.com/search/docs/appearance/site-names
      // images: {
      //   url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
      //   width: 1200,
      //   height: 630,
      // },
      locale: 'en_US',
      type: 'website',
    },
  };
};

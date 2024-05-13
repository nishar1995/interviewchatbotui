import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  // restricted routes
  matcher: [
    '/',
    '/financial',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',
  ],
};

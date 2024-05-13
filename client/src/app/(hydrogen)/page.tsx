'use server';
import { routes } from '@/config/routes';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';
import Cookies from 'js-cookie';
import { UserRole } from '@/enums/role';

export default async function Page() {
  //should be same as in next auth options

  const cookieValue: any = Cookies.get('user_details');
  const user: any = cookieValue ? JSON.parse(cookieValue) : {};

  if (user?.role === UserRole.HR) {
    redirect(routes.fileManager.dashboard);
  }
  if (user?.role === UserRole.HR_MANAGER) {
    redirect(routes.interview.dashboard);
  }
  if (user?.role === UserRole.CANDIDATE) {
    redirect(routes.candidate.dashboard);
  }
  
  redirect(routes.fileManager.dashboard);
}

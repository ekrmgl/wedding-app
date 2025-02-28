// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import DashboardClient from '@/components/DashboardClient';

export default async function Dashboard() {
  const session = await getAuthSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <DashboardClient session={session} />;
}
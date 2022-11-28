import { Home } from '@/components/Home';
import { getCurrentUser } from '@/lib/auth';
import { getUserStats } from '@/lib/stats';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/login');
  }

  const stats = await getUserStats(user);

  return <Home stats={stats} />;
}

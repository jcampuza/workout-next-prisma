import { Settings } from '@/components/Settings';
import { getCurrentUser } from '@/lib/auth';
import { getUserStats } from '@/lib/stats';
import { redirect } from 'next/navigation';
import { env } from '../../../env/server';

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/login');
  }

  const stats = await getUserStats(user);

  return <Settings settings={stats} />;
}

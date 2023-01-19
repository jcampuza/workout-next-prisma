'use client';

import { PercentageTable } from '@/components/PercentageTable';
import { UserStats } from '@prisma/client';
import { useLocalStorage } from '@/lib/useLocalStorage';

type UserStatsProp = Omit<UserStats, 'updatedAt'> & { updatedAt: string };

const KEY = 'HOME__max__';

export const Home = ({ stats }: { stats: UserStatsProp }) => {
  const [max, setMax] = useLocalStorage(KEY, 0);

  const useSquatMax = () => {
    setMax(stats.squat ?? 0);
  };

  const useBenchMax = () => {
    setMax(stats.bench ?? 0);
  };

  const useDeadliftMax = () => {
    setMax(stats.deadlift ?? 0);
  };

  const useOHPMax = () => {
    setMax(stats.ohp ?? 0);
  };

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max ({stats.mode})</span>

          <input
            value={max}
            type="number"
            pattern="[0-9]*"
            onChange={(e) => setMax(Number(e.currentTarget.value))}
          />
        </label>
        <div className="flex gap-2">
          <button onClick={useBenchMax}>Bench</button>
          <button onClick={useSquatMax}>Squat</button>
          <button onClick={useDeadliftMax}>Deadlift</button>
          <button onClick={useOHPMax}>OHP</button>
        </div>
      </div>

      <PercentageTable max={max} mode={stats.mode} />
    </main>
  );
};

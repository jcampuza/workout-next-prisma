import { useEffect, useState } from 'react';
import { PercentageTable } from '../components/PercentageTable';
import { Spinner } from '../components/Spinner';
import { isClient } from '../lib/isClient';
import { trpc } from '../lib/trpc';
import { NextPageWithAuth } from '../types/next';

const KEY = 'HOME__max__';

const Home: NextPageWithAuth = () => {
  const { data } = trpc.stats.all.useQuery();

  const [max, setMax] = useState(() => {
    return isClient() ? Number(localStorage.getItem(KEY)) ?? 0 : 0;
  });

  useEffect(() => {
    localStorage.setItem(KEY, max.toString());
  }, [max]);

  if (!data) {
    return <Spinner />;
  }

  const useSquatMax = () => {
    setMax(data.squat ?? 0);
  };

  const useBenchMax = () => {
    setMax(data.bench ?? 0);
  };

  const useDeadliftMax = () => {
    setMax(data.deadlift ?? 0);
  };

  const useOHPMax = () => {
    setMax(data.ohp ?? 0);
  };

  return (
    <main className="p-4">
      <div className="space-y-2">
        <label className="flex flex-col">
          <span>Training Max ({data?.mode})</span>

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

      <PercentageTable max={max} mode={data.mode} />
    </main>
  );
};

Home.auth = true;

export default Home;

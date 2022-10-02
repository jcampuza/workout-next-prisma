import { useState } from 'react';
import { Spinner } from '../components/Spinner';
import {
  getPercentage,
  getPrimaryRoundedAmount,
  getSecondaryRoundedAmount,
} from '../lib/conversions';
import { NextPageWithAuth } from '../types/next';
import { inferQueryOutput, trpc } from '../utils/trpc';

type Mode = inferQueryOutput<'stats.all'>['mode'];

const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

const Home: NextPageWithAuth = () => {
  const { data } = trpc.useQuery(['stats.all']);
  const [max, setMax] = useState(0);

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
          <button onClick={useBenchMax}>Bench Max</button>
          <button onClick={useSquatMax}>Squat Max</button>
          <button onClick={useDeadliftMax}>Deadlift Max</button>
        </div>
      </div>

      <PercentageTable max={max} mode={data.mode} />
    </main>
  );
};

Home.auth = true;

export default Home;

const PercentageTable = ({ max, mode }: { max: number; mode: Mode }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>%</th>
          <th>{mode}</th>
          <th>
            {mode} -&gt; {mode === 'KGS' ? 'LBS' : 'KGS'}
          </th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {PERCENTAGES.map((percentage) => {
          const primaryRoundedAmount = getPrimaryRoundedAmount(max, percentage, mode);
          const secondaryRoundedAmount = getSecondaryRoundedAmount(primaryRoundedAmount, mode);
          const actualPercent = getPercentage(primaryRoundedAmount, max, mode);

          return (
            <tr key={percentage}>
              <td>{percentage * 100}%</td>
              <td>{primaryRoundedAmount}</td>
              <td>{secondaryRoundedAmount}</td>
              <td>{actualPercent}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

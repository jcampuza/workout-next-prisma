import { Mode } from '@prisma/client';
import {
  getPercentage,
  getPrimaryRoundedAmount,
  getSecondaryRoundedAmount,
} from '../lib/conversions';

const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

export const PercentageTable = ({ max, mode }: { max: number; mode: Mode }) => {
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

import { ChangeEvent, useState } from 'react';
import { fix, KG_COEFFICIENT } from '../lib/utils';
import { NextPageWithAuth } from '../types/next';

const Convert: NextPageWithAuth = () => {
  const { lbs, kgs } = { lbs: 0, kgs: 0 };

  const [values, setValues] = useState(() => ({ lbs, kgs }));

  const kgPlus = () => {
    setValues(({ kgs }) => ({
      kgs: kgs + 1,
      lbs: fix((kgs + 1) * KG_COEFFICIENT),
    }));
  };

  const kgMinus = () => {
    setValues(({ kgs }) => ({
      kgs: kgs - 1,
      lbs: fix((kgs - 1) * KG_COEFFICIENT),
    }));
  };

  const handleKgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const kgs = Number(event.currentTarget.value);

    setValues({
      kgs: kgs,
      lbs: fix(kgs * KG_COEFFICIENT),
    });
  };

  const lbsPlus = () => {
    setValues(({ lbs }) => ({
      lbs: lbs + 1,
      kgs: fix((lbs + 1) / KG_COEFFICIENT),
    }));
  };

  const lbsMinus = () => {
    setValues(({ lbs }) => ({
      lbs: lbs - 1,
      kgs: fix((lbs - 1) / KG_COEFFICIENT),
    }));
  };

  const handleLbsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lbs = Number(event.currentTarget.value);
    const kgs = lbs / KG_COEFFICIENT;

    setValues({
      kgs: lbs,
      lbs: fix(kgs / KG_COEFFICIENT),
    });
  };

  return (
    <main className="p-4">
      <ul className="space-y-4">
        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Kilograms</span>
            <input value={values.kgs} type="number" pattern="[0-9]*" onChange={handleKgsChange} />
          </label>

          <div className="flex gap-2">
            <button onClick={kgPlus}>+</button>
            <button onClick={kgMinus}>-</button>
          </div>
        </li>

        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Pounds</span>
            <input value={values.lbs} type="number" pattern="[0-9]*" onChange={handleLbsChange} />
          </label>
          <div className="flex gap-2">
            <button onClick={lbsPlus}>+</button>
            <button onClick={lbsMinus}>-</button>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default Convert;

'use client';

import { ChangeEvent, useState } from 'react';
import { fix, KG_COEFFICIENT } from '@/lib/utils';

const Convert = () => {
  const [values, setValues] = useState({ lbs: '', kgs: '' });
  const kgsValue = Number(values.kgs);
  const lbsValue = Number(values.lbs);

  const kgPlus = () => {
    setValues({
      kgs: `${kgsValue + 1}`,
      lbs: `${fix((kgsValue + 1) * KG_COEFFICIENT)}`,
    });
  };

  const kgMinus = () => {
    setValues({
      kgs: `${kgsValue - 1}`,
      lbs: `${fix((kgsValue - 1) * KG_COEFFICIENT)}`,
    });
  };

  const lbsPlus = () => {
    setValues({
      lbs: `${lbsValue + 1}`,
      kgs: `${fix((lbsValue + 1) / KG_COEFFICIENT)}`,
    });
  };

  const lbsMinus = () => {
    setValues({
      lbs: `${lbsValue - 1}`,
      kgs: `${fix((lbsValue - 1) / KG_COEFFICIENT)}`,
    });
  };

  const handleKgsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const kgs = event.currentTarget.value;

    setValues({
      kgs: kgs,
      lbs: `${fix(Number(kgs) * KG_COEFFICIENT)}`,
    });
  };

  const handleLbsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lbs = event.currentTarget.value;

    setValues({
      lbs: lbs,
      kgs: `${fix(Number(lbs) / KG_COEFFICIENT)}`,
    });
  };

  return (
    <main className="p-4">
      <ul className="space-y-4">
        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Kilograms</span>
            <input
              value={values.kgs}
              pattern="\d*"
              inputMode="numeric"
              onChange={handleKgsChange}
            />
          </label>

          <div className="flex gap-2">
            <button onClick={kgPlus}>+</button>
            <button onClick={kgMinus}>-</button>
          </div>
        </li>

        <li className="space-y-2">
          <label className="flex flex-col">
            <span>Pounds</span>
            <input
              value={values.lbs}
              pattern="\d*"
              inputMode="numeric"
              onChange={handleLbsChange}
            />
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

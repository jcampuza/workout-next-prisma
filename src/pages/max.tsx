import React, { useState } from 'react';
import { fix, isNumeric } from '../lib/utils';
import { NextPageWithAuth } from '../types/next';

const value = new Map([
  [1, 1.0],
  [2, 0.97],
  [3, 0.94],
  [4, 0.92],
  [5, 0.89],
  [6, 0.86],
  [7, 0.83],
  [8, 0.81],
  [9, 0.78],
  [10, 0.75],
  [11, 0.73],
  [12, 0.71],
  [13, 0.7],
  [14, 0.68],
  [15, 0.67],
  [16, 0.65],
  [17, 0.64],
  [18, 0.63],
  [19, 0.61],
  [20, 0.6],
  [21, 0.59],
  [22, 0.58],
  [23, 0.57],
  [24, 0.56],
  [25, 0.55],
  [26, 0.54],
  [27, 0.53],
  [28, 0.52],
  [29, 0.51],
  [30, 0.5],
]);

const OneRepMax: NextPageWithAuth = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const onWeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    setWeight(e.currentTarget.value);
  };

  const onRepsChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReps(e.currentTarget.value);
  };

  const areNumbericValues = isNumeric(reps) && isNumeric(weight);
  const respNum = Number(reps);
  const repsWeight = Number(weight);

  const getOneRepMax = () => {
    const percent = value.get(respNum);
    if (!percent) {
      return null;
    }

    return fix(repsWeight / percent);
  };

  return (
    <main className="p-4">
      <div className="mb-4 space-y-2">
        <label className="flex flex-col">
          <span>Weight (lbs)</span>
          <input value={weight} pattern="\d+" onChange={onWeightChange} />
        </label>

        <label className="flex flex-col">
          <span>Reps</span>
          <input value={reps} pattern="[0-9]*" onChange={onRepsChange} />
        </label>
      </div>

      {areNumbericValues ? (
        <div>Estimated One Rep Max: {getOneRepMax() ?? 'Please enter reps below 30'}</div>
      ) : (
        <div>Please enter numberic values</div>
      )}
    </main>
  );
};

OneRepMax.auth = true;

export default OneRepMax;

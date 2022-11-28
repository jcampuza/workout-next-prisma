'use client';

import { Spinner } from '@/components/Spinner';
import { patchUserStatsSchema } from '@/lib/schemas';
import { fix } from '@/lib/utils';
import { UserStats } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

export const Settings = (props: { settings: UserStats }) => {
  const router = useRouter();
  const [bench, setBench] = useState(props.settings.bench ?? 0);
  const [squat, setSquat] = useState(props.settings.squat ?? 0);
  const [deadlift, setDeadlift] = useState(props.settings.deadlift ?? 0);
  const [ohp, setOHP] = useState(props.settings.ohp ?? 0);
  const [mode, setMode] = useState(props.settings.mode ?? 'LBS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSetter = (setter: Dispatch<SetStateAction<number>>) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value);
      setter(fix(value));
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = patchUserStatsSchema.safeParse({
      bench,
      squat,
      deadlift,
      ohp,
      mode,
    });

    if (!result.success) {
      return alert(JSON.stringify(result.error.format()));
    }

    setIsSubmitting(true);

    const response = await fetch('/api/stats', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });

    setIsSubmitting(false);

    if (response.ok) {
      alert('SUCCESS');
    }

    router.refresh();
  };

  const getLastUpdatedTime = () => {
    const curr = props.settings.updatedAt;
    if (curr) {
      return new Date(curr).toLocaleDateString();
    }
    return '';
  };

  const lastUpdatedTime = getLastUpdatedTime();

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4 space-y-4">
          <ul className="space-y-4">
            <li>
              <label className="flex flex-col">
                <span>Bench Training Max</span>
                <input
                  value={bench}
                  type="number"
                  pattern="[0-9]*"
                  onChange={createSetter(setBench)}
                />
              </label>
            </li>

            <li>
              <label className="flex flex-col">
                <span>Squat Training Max</span>
                <input
                  value={squat}
                  type="number"
                  pattern="[0-9]*"
                  onChange={createSetter(setSquat)}
                />
              </label>
            </li>

            <li>
              <label className="flex flex-col">
                <span>Deadlift Training Max</span>
                <input
                  value={deadlift}
                  type="number"
                  pattern="[0-9]*"
                  onChange={createSetter(setDeadlift)}
                />
              </label>
            </li>

            <li>
              <label className="flex flex-col">
                <span>OHP Training Max</span>
                <input value={ohp} type="number" pattern="[0-9]*" onChange={createSetter(setOHP)} />
              </label>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="mb-2">Mode</p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="lbs"
                checked={mode === 'LBS'}
                onChange={() => setMode('LBS')}
              />
              <span className="ml-2">Lbs</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="kg"
                checked={mode === 'KGS'}
                onChange={() => setMode('KGS')}
              />
              <span className="ml-2">Kgs</span>
            </label>
          </div>
        </div>

        <div className="flex">
          <button type="submit" disabled={isSubmitting}>
            Update
          </button>
          {isSubmitting ? <Spinner className="ml-4" /> : null}
        </div>
      </form>

      <div>
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </div>

      {lastUpdatedTime ? <div className="mt-4">Last Updated: {lastUpdatedTime}</div> : null}
    </main>
  );
};

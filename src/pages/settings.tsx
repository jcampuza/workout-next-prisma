import { signOut } from 'next-auth/react';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { fix } from '../lib/utils';
import { NextPageWithAuth } from '../types/next';
import { inferMutationInput, inferQueryOutput, trpc } from '../utils/trpc';
import z from 'zod';
import { Mode } from '@prisma/client';

type StatsQuery = inferQueryOutput<'stats.all'>;
type StatsUpdateInput = inferMutationInput<'stats.updateAll'>;

const Settings: NextPageWithAuth = () => {
  const utils = trpc.useContext();
  const { data } = trpc.useQuery(['stats.all']);
  const { mutate } = trpc.useMutation('stats.updateAll', {
    onSuccess: () => {
      utils.invalidateQueries('stats.all');
      alert('successfully updated');
    },
    onError(err) {
      alert(err.message);
    },
  });

  const submitSettings = async (input: StatsUpdateInput) => {
    mutate(input);
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <SettingsLayout key={data.updatedAt.toString()} settings={data} onSubmit={submitSettings} />
  );
};

const settingsFormSchema = z.object({
  bench: z.number(),
  squat: z.number(),
  deadlift: z.number(),
  ohp: z.number(),
  mode: z.nativeEnum(Mode),
});

const SettingsLayout = (props: {
  settings: StatsQuery;
  onSubmit: (input: StatsUpdateInput) => void;
}) => {
  const [bench, setBench] = useState(props.settings.bench ?? 0);
  const [squat, setSquat] = useState(props.settings.squat ?? 0);
  const [deadlift, setDeadlift] = useState(props.settings.deadlift ?? 0);
  const [ohp, setOHP] = useState(props.settings.ohp ?? 0);
  const [mode, setMode] = useState(props.settings.mode ?? 'LBS');

  const createSetter = (setter: Dispatch<SetStateAction<number>>) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value);
      setter(fix(value));
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = settingsFormSchema.safeParse({
      bench,
      squat,
      deadlift,
      ohp,
      mode,
    });

    if (!result.success) {
      return alert(JSON.stringify(result.error.format()));
    }

    props.onSubmit(result.data);
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

        <div>
          <button type="submit">Update</button>
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

Settings.auth = true;

export default Settings;

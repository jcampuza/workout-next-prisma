import { createRouter } from './context';
import { statsRouter } from './stats';

export const appRouter = createRouter().merge('stats.', statsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import { createRouter } from './context';
import superjson from 'superjson';
import { statsRouter } from './stats';

export const appRouter = createRouter().transformer(superjson).merge('stats.', statsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { mediaRouter } from './media';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("media.", mediaRouter);

  // export type definition of API
export type AppRouter = typeof appRouter;

import * as trpc from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';
import { dogsRouter } from './dogs';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge('dogs.', dogsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import * as trpc from '@trpc/server';
import { env } from 'process';
import { z } from 'zod';
import { prisma } from '../../db/client';
import { getOptionsForVote } from '../../utils/getRandomMovie';

export const dogsRouter = trpc
  .router()
  .query('get-all', {
    async resolve() {
      return await prisma.media.findMany();
    }
  })
  .query('get-dog-pairs', {
    async resolve() {
      const [firstId, secondId] = getOptionsForVote()
      return [];
    }
  });

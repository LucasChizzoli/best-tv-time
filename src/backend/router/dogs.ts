import * as trpc from '@trpc/server';
import { env } from 'process';
import { z } from 'zod';
import { prisma } from '../../db/client';
import { getOptionsForVote } from '../../utils/getRandomDog';

export const dogsRouter = trpc
  .router()
  .query('get-ranking', {
    async resolve() {
      return await prisma.dog.findMany({
        orderBy: {
          VoteFor: { _count: "desc" }
        },
        take: 10,
        select: {
          id: true,
          name: true,
          imageUrl: true,
          _count: {
            select: {
              VoteFor: true,
              VoteAgainst: true,
            },
          },
        },
      });
    }
  })
  .query('get-dog-pairs', {
    async resolve() {
      const [firstId, secondId] = getOptionsForVote();
      const firstDog = await prisma.dog.findFirst({where: { id: firstId }});
      const secondDog = await prisma.dog.findFirst({where: { id: secondId }});

      if (!firstDog || !secondDog) {
        throw new Error("Dogs not found");
      }
      
      return { firstDog, secondDog };
    }
  })
  .mutation('vote-dog', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({input}) {
      const vote = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst,
        }
      })
      return { success: true, vote };
    }
  });

import * as trpc from '@trpc/server';
import { env } from 'process';
import { z } from 'zod';
import { prisma } from '../../db/client';

const MOVIES_BASE_URL = 'https://api.themoviedb.org/3/movie/'
const API_KEY = env["MOVIE_API_KEY"];

export type Media = {
  title?: string;
  coverUrl?: string;
}

const getMovieById = async (id: number): Promise<Media> => {
  
  const url = `${MOVIES_BASE_URL}${id.toString()}?api_key=${API_KEY}`;
  const response = await fetch(url);
  
  if (response.status !== 200) return {};

  const movie = await response.json();
  return {
    title: movie.title,
    coverUrl: `${MOVIES_BASE_URL}${id}/movie.poster_path`,
  }
}

export const mediaRouter = trpc
  .router()
  .query('get-all', {
    async resolve() {
      return await prisma.media.findMany();
    }
  })
  .query('get-movie-by-id', {
    input: z.object({id: z.number()}),
    async resolve({input}) {
      console.log(input);
      return await getMovieById(input.id);
    }
  });

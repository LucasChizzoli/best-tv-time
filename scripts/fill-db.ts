import { prisma } from '../src/db/client';
import dogsBreeds from '../dog-breeds.json';

export const fillDb = async () => {
  const creation = await prisma.dog.createMany({
    data: dogsBreeds.map((dog, index) => (
    {
      id: index + 1,
      name: dog.name,
      imageUrl: dog.imageURL
    }
    ))
  });

  console.log("Creation", creation);
}

fillDb();

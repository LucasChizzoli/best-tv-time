import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';
import Image from 'next/image';

const Home: NextPage = () => {
  const { data: dogPair, isLoading, refetch } = trpc.useQuery(["dogs.get-dog-pairs"]);

  if (isLoading || !dogPair) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center text-2xl">
        Loading...
      </div>
    )
  }

  const voteMutation = trpc.useMutation(["dogs.vote-dog"]);

  const voteCutest = (dogId: number) => {
    if (!dogPair) return;

    const selected = dogId === dogPair.firstDog.id ? dogPair.firstDog.id : dogPair.secondDog.id

    if (selected === dogPair.firstDog.id) {
      voteMutation.mutate({
        votedFor: dogPair.firstDog.id,
        votedAgainst: dogPair.secondDog.id,
      });
    } else {
      voteMutation.mutate({
        votedFor: dogPair.secondDog.id,
        votedAgainst: dogPair.firstDog.id,
      });
    }
    refetch();
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center">
      <h1 className="text-4xl text-center mb-5">
        Which dog is cutest?
      </h1>
      {dogPair && (
        <div className="mt-5 flex justify-between max-w-2xl">
          <div className="w-200">
            <Image src={dogPair.firstDog.imageUrl ?? ''} alt={dogPair.firstDog.name} height="200" width="200" />
            <h2 className="text-xl">{dogPair.firstDog.name}</h2>
            <button className="mt-3 bg-white text-black rounded-lg py-2 px-5 hover:bg-gray-200" onClick={() => voteCutest(dogPair.firstDog.id)}>Cutest</button>
          </div>
          <div className="p-8 text-2xl">vs</div>
          <div className="w-200">
          <Image src={dogPair.secondDog.imageUrl ?? ''} alt={dogPair.secondDog.name} height="200" width="200" />
          <h2 className="text-xl">{dogPair.secondDog.name}</h2>
          <button className="mt-3 bg-white text-black rounded-lg py-2 px-5 hover:bg-gray-200" onClick={() => voteCutest(dogPair.secondDog.id)}>Cutest</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;

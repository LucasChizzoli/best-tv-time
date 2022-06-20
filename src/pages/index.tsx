import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  const {
    data: dogPair,
    isLoading,
    refetch,
  } = trpc.useQuery(['dogs.get-dog-pairs']);
  const voteMutation = trpc.useMutation(['dogs.vote-dog']);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center text-2xl">
        Loading...
      </div>
    );
  }

  const voteCutest = (dogId: number) => {
    if (!dogPair) return;

    const selected =
      dogId === dogPair.firstDog.id
        ? dogPair.firstDog.id
        : dogPair.secondDog.id;

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
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 text-white text-center">
      <Head>
        <title>Cutest Dog</title>
      </Head>
      <h1 className="text-4xl text-center mb-5">Which dog is cutest?</h1>
      {dogPair && (
        <div className="mt-5 flex justify-between max-w-2xl">
          <div className="w-200">
            <Image
              src={
                dogPair.firstDog.imageUrl
                  ? dogPair.firstDog.imageUrl
                  : '/image-placeholder.png'
              }
              alt={dogPair.firstDog.name}
              height="200"
              width="200"
            />
            <h2 className="text-xl">{dogPair.firstDog.name}</h2>
            <button
              className="mt-3 bg-white text-black rounded-lg py-2 px-5 hover:bg-gray-200"
              onClick={() => voteCutest(dogPair.firstDog.id)}
              disabled={fetchingNext}
            >
              Cutest
            </button>
          </div>
          <div className="p-8 text-2xl">vs</div>
          <div className="w-200">
            <Image
              src={
                dogPair.secondDog.imageUrl
                  ? dogPair.secondDog.imageUrl
                  : '/image-placeholder.png'
              }
              alt={dogPair.secondDog.name}
              height="200"
              width="200"
            />
            <h2 className="text-xl">{dogPair.secondDog.name}</h2>
            <button
              className="mt-3 bg-white text-black rounded-lg py-2 px-5 hover:bg-gray-200"
              onClick={() => voteCutest(dogPair.secondDog.id)}
              disabled={fetchingNext}
            >
              Cutest
            </button>
          </div>
        </div>
      )}
      {!dogPair && <div>No dogs to compare!</div>}
      <div className="w-full text-xl text-center pb-2 mt-9">
        <Link href="/ranking">
          <a className="underline hover:text-gray-400">Check the Ranking!</a>
        </Link>
        <div className="mt-5">
          <a
            className="underline hover:text-gray-400"
            href="https://twitter.com/LChizzoli"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

import type { NextPage } from 'next';
import { trpc } from '../utils/trcp';
import Image from 'next/image';

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["dogs.get-dog-pairs"]);

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  console.log(data);
  const [dogOne, dogTwo] = data;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center">
        Which dog is cuetter?
      </h1>
      <div className="mt-5 flex justify-between max-w-2xl">
        <div className="w-200">
          <Image src={dogOne?.imageUrl ?? ''} alt={dogOne?.name} height="200" width="200" />
          <h2 className="text-xl">{dogOne?.name}</h2>
        </div>
        <div className="p-8">vs</div>
        <div className="w-200">
        <Image src={dogTwo?.imageUrl ?? ''} alt={dogTwo?.name} height="200" width="200" />
        <h2 className="text-xl">{dogTwo?.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default Home;
